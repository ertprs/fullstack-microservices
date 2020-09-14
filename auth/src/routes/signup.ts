import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { DatabaseConnectionError } from "../errors/Database-connection-error";
import { RequestValidationError } from "../errors/Request-validation-error";
const route = Router();

route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("please enter a valid email"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("password must have 6 characters minimum and 20 maximum")
  ],
  (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    throw new DatabaseConnectionError();
  }
);

export { route as signUpRouter };
