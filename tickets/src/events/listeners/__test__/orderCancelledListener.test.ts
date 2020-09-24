import { OrderCancelledEvent } from "@kmtickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket, TicketDoc } from "../../../models/ticket";
import { natsWrapper } from "../../../NatsWrapper";
import { OrderCancelledListener } from "../orderCancelledListener";
const setup = async (): Promise<{
  listener: OrderCancelledListener;
  ticket: TicketDoc;
  data: OrderCancelledEvent["data"];
  msg: Message;
}> => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const orderId = mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    price: 123,
    title: "concert",
    userId: "ldjlkdfjldkf",
    orderId
  });
  await ticket.save();
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return {
    listener,
    data,
    msg,
    ticket
  };
};
