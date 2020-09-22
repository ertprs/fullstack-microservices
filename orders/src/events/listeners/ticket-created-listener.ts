import { Listener, Subjects, TicketCreatedEvent } from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;
  async onMessage(
    data: TicketCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const ticket = Ticket.build({
      price: data.price,
      title: data.title,
      _id: data.id
    });
    await ticket.save();
    msg.ack();
  }
}
