import { auth, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";

const route = Router();

route.post(
  "/api/payments",
  auth,
  body("orderId").notEmpty(),
  body("token").notEmpty(),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    res.send({ message: "Success" });
  }
);
export { route as newRoute };
