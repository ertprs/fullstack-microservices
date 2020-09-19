import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";

const route = Router();

route.get(
  "/api/tickets",
  async (req: Request, res: Response): Promise<void> => {
    const tickets = await Ticket.find({});
    res.send(tickets);
  }
);

export { route as indexRouter };
