import { Ticket, TicketDoc } from "../../../models/ticket";
import mongoose from "mongoose";
import { natsWrapper } from "../../../NatsWrapper";
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import { ExpirationComplete, OrderStatus } from "@kmtickets/common";
import { Order, OrderDoc } from "../../../models/order";
import { Message } from "node-nats-streaming";

const setup = async (): Promise<{
  listener: ExpirationCompleteListener;
  ticket: TicketDoc;
  order: OrderDoc;
  data: ExpirationComplete["data"];
  msg: Message;
}> => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  const ticket = Ticket.build({
    _id: mongoose.Types.ObjectId().toHexString(),
    price: 1232,
    title: "concert"
  });
  await ticket.save();
  const order = Order.build({
    expiresAt: new Date(),
    userId: "kjshsd",
    status: OrderStatus.Created,
    ticket
  });
  await order.save();
  const data: ExpirationComplete["data"] = {
    orderId: order.id
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, ticket, order, data, msg };
};
