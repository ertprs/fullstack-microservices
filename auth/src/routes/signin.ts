import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/BadRequestError";
import { RequestValidationError } from "../errors/Request-validation-error";
import { User } from "../models/User";
import { Password } from "../services/Password";
import { validateRequest } from "../middlewares/validate-request";
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
      throw new BadRequestError("No user with that email");
    }
    const isMatch = await Password.compare(user.password, password);
    if (!isMatch) {
      throw new BadRequestError("Passwords do not match");
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
