import { OrderCreatedEvent, OrderStatus } from "@kmtickets/common";
import { natsWrapper } from "../../../NatsWrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async (): Promise<{
  listener: OrderCreatedListener;
  data: OrderCreatedEvent["data"];
  msg: Message;
}> => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent["data"] = {
    expiresAt: "lsjkl",
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: "lkjsds",
    version: 0,
    ticket: {
      id: "kljlkdsj",
      price: 1232
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg };
};
