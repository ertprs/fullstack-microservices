import {
  Listener,
  OrderStatus,
  PaymentCreatedEvent,
  Subjects
} from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  protected subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  protected queueGroupName: string = queueGroupName;
  async onMessage(
    data: PaymentCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = await Order.findById(data.orderId);
    if (!order) {
      throw new Error("No order with that id");
    }
    order.status = OrderStatus.Complete;
    await order.save();
    msg.ack();
  }
}
