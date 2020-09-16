import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/BadRequestError";
import { RequestValidationError } from "../errors/Request-validation-error";
import { User } from "../models/User";
import { Password } from "../services/Password";
const route = Router();

interface SignUp {
  email: string;
  password: string;
}

route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("please enter a valid email"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("password must have 6 characters minimum and 20 maximum")
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body as SignUp;
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new BadRequestError("A user with that email already exists");
    }
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY MUST BE PROVIDED");
    }
    // HASH PASSWORD
    const hashedPassword = await Password.toHash(password);
    console.log(User.build);
    const user = User.build({ email, password: hashedPassword });
    await user.save();
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY
    );
    req.session = {
      ...req.session,
      jwt: userJwt
    };
    res.status(201).send(user);
  }
);

export { route as signUpRouter };
