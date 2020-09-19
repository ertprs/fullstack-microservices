import { NotFound } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { Ticket } from "../models/ticket";

const route = Router();

route.get(
  "/api/tickets/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFound();
    }
    res.send(ticket);
  }
);

export { route as showRoute };
