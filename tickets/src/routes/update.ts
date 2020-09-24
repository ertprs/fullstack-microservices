import {
  auth,
  BadRequestError,
  NotAuthorizedError,
  NotFound,
  validateRequest
} from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { TicketUpdatedPublisher } from "../events/publishers/ticketUpdatedPublisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../NatsWrapper";

const route = Router();

interface Body {
  title: string;
  price: number;
}

route.put(
  "/api/tickets/:id",
  auth,
  body("title").trim().notEmpty().withMessage("a title must be provided"),
  body("price").isFloat({ gt: 0 }).withMessage("please provide a valid price"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { title, price } = req.body as Body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      throw new NotFound();
    }
    if (ticket.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    if (ticket.orderId) {
      throw new BadRequestError("Cannot update an already reserved ticket");
    }
    ticket.title = title;
    ticket.price = price;
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version
    });
    res.send(ticket);
  }
);

export { route as updateRoute };
