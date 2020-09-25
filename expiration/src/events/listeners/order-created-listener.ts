import { Listener, OrderCreatedEvent, Subjects } from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { expirationQueue } from "../../queues/expiration-queue";
import { queueGroupName } from "./queueGroupName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  protected subject: Subjects.OrderCreated = Subjects.OrderCreated;
  protected queueGroupName: string = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("waiting this many milliseconds to process the request", delay);
    await expirationQueue.add(
      {
        orderId: data.id
      },
      {
        delay
      }
    );
    msg.ack();
  }
}
