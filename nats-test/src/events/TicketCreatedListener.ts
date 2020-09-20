import { Message } from "node-nats-streaming";
import { Listener } from "./BaseListener";

export class TicketCreatedListener extends Listener {
  subject = "ticket:created";
  queueGroupName = "payments-service";
  protected onMessage(data: { [key: string]: string }, msg: Message) {
    console.log("Event data:", data);
    msg.ack();
  }
}
