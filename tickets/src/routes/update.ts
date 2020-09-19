import { auth, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const route = Router();

interface Body {
  title: string;
  price: number;
  id: string;
}

route.put(
  "/api/tickets",
  auth,
  body("title").trim().notEmpty().withMessage("a title must be provided"),
  body("price").isFloat({ gt: 0 }).withMessage("please provide a valid price"),
  body("id")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("please provide a valid id"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { title, price, id } = req.body as Body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { title, price });
    res.send(updatedTicket);
  }
);

export { route as updateRoute };
