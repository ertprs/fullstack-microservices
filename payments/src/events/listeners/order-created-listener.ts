import { Listener, OrderCreatedEvent, Subjects } from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/Order";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  protected subject: Subjects.OrderCreated = Subjects.OrderCreated;
  protected queueGroupName: string = queueGroupName;
  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const order = Order.build({
      _id: data.id,
      price: data.ticket.price,
      userId: data.userId,
      status: data.status,
      version: data.version
    });
    await order.save();
    msg.ack();
  }
}
