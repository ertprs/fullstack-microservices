import {
  ExpirationComplete,
  Listener,
  OrderStatus,
  Subjects
} from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";
import { queueGroupName } from "./queue-group-name";

export class ExpirationCompleteListener extends Listener<ExpirationComplete> {
  protected subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  protected queueGroupName: string = queueGroupName;
  async onMessage(data: ExpirationComplete["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate("ticket");
    if (!order) {
      throw new Error("No order with that ID found");
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id
      }
    });
    msg.ack();
  }
}
