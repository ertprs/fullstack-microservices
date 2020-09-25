import {
  Listener,
  OrderCancelledEvent,
  OrderStatus,
  Subjects
} from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { queueGroupName } from "./queueGroupName";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  protected subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  protected queueGroupName: string = queueGroupName;
  async onMessage(
    data: OrderCancelledEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1
    });
    if (!order) {
      throw new Error("No order found");
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    msg.ack();
  }
}
