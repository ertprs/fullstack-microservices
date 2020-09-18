import { auth, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";

const route = Router();

route.post(
  "/api/tickets",
  auth,
  body("title").trim().notEmpty().withMessage("a title must be provided"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),
  validateRequest,
  (req: Request, res: Response): void => {
    res.sendStatus(200);
  }
);

export { route as newRoute };
