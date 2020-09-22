import { auth, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";

const route = Router();

route.post(
  "/api/post",
  auth,
  body("ticketId")
    .trim()
    .notEmpty()
    .custom((ticketId: string): boolean =>
      mongoose.Types.ObjectId.isValid(ticketId)
    ),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    res.send({});
  }
);

export { route as newRoute };
