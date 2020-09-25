import { OrderCreatedEvent, OrderStatus } from "@kmtickets/common";
import { natsWrapper } from "../../../NatsWrapper";
import { OrderCreatedListener } from "../order-created-listener";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Order } from "../../../models/Order";

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
it("should replicate the order info", async (): Promise<void> => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);
  expect(order?.price).toEqual(data.ticket.price);
});

it("should ack the message", async (): Promise<void> => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
