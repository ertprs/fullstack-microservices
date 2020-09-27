import {
  auth,
  BadRequestError,
  NotFound,
  OrderStatus,
  validateRequest
} from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import mongoose from "mongoose";
import { OrderCreatedPublisher } from "../events/publishers/order-created-publisher";
import { Order } from "../models/order";
import { Ticket } from "../models/ticket";
import { natsWrapper } from "../NatsWrapper";

const route = Router();

const EXPIRATION_WINDOW_SECONDS = 60 * 15;

route.post(
  "/api/orders",
  auth,
  body("ticketId")
    .trim()
    .notEmpty()
    .custom((ticketId: string): boolean =>
      mongoose.Types.ObjectId.isValid(ticketId)
    ),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { ticketId } = req.body;
    console.log(ticketId);
    console.log(await Ticket.find({}));
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      throw new NotFound();
    }
    const isReserved = await ticket.isReserved();
    if (isReserved) {
      throw new BadRequestError("this ticket is reserved");
    }
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);
    const order = Order.build({
      expiresAt: expiration,
      status: OrderStatus.Created,
      ticket,
      userId: req.currentUser!.id
    });
    await order.save();
    //  SEND EVENT FOR NEW ORDER CREATED
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
      status: order.status,
      ticket: {
        id: order.ticket.id,
        price: order.ticket.price
      }
    });
    res.status(201).send(order);
  }
);

export { route as newRoute };
