import { Order, OrderDoc } from "../../../models/Order";
import { natsWrapper } from "../../../NatsWrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";
import { OrderCancelledEvent, OrderStatus } from "@kmtickets/common";
import { Message } from "node-nats-streaming";

const setup = async (): Promise<{
  listener: OrderCancelledListener;
  order: OrderDoc;
  data: OrderCancelledEvent["data"];
  msg: Message;
}> => {
  const listener = new OrderCancelledListener(natsWrapper.client);
  const order = Order.build({
    _id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 213,
    userId: "jshsd",
    version: 0
  });
  await order.save();
  const data: OrderCancelledEvent["data"] = {
    id: order.id,
    version: 1,
    ticket: {
      id: "lksjlksdj"
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, msg, data, order };
};
it("should update status of the order", async (): Promise<void> => {
  const { listener, msg, data, order } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it("should ack the message", async (): Promise<void> => {
  const { listener, msg, data, order } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
