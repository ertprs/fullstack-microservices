import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { User } from "../models/User";
import { Password } from "../services/Password";
import { BadRequestError, validateRequest } from "@kmtickets/common";
const route = Router();

interface SignIn {
  email: string;
  password: string;
}

route.post(
  "/api/users/signin",
  body("email").isEmail().withMessage("please enter a valid email"),
  body("password").trim().notEmpty().withMessage("password must not be empty"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body as SignIn;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }
    const isMatch = await Password.compare(user.password, password);
    if (!isMatch) {
      throw new BadRequestError("Invalid credentials");
    }
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    );
    req.session = { ...req.session, jwt: userJwt };
    res.send(user);
  }
);

export { route as signInRouter };
