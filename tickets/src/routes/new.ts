import { auth, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { TicketCreatedPublisher } from "../events/publishers/ticketCreatedPublisher";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../NatsWrapper";

const route = Router();

interface Body {
  title: string;
  price: number;
}

route.post(
  "/api/tickets",
  auth,
  body("title").trim().notEmpty().withMessage("a title must be provided"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("price must be a positive number"),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { title, price } = req.body as Body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser?.id! });
    await ticket.save();
    new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
    });
    res.status(201).send(ticket);
  }
);

export { route as newRoute };
