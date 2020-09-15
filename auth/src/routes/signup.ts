import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/Database-connection-error";
import { RequestValidationError } from "../errors/Request-validation-error";
import { User } from "../models/User";
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
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
      }
      const { email, password } = req.body as SignUp;
      const userExists = await User.findOne({ email });
      if (userExists) {
        res.send({});
        return;
      }

      // HASH PASSWORD

      const user = User.build({ email, password });
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      throw new DatabaseConnectionError();
    }
  }
);

export { route as signUpRouter };
