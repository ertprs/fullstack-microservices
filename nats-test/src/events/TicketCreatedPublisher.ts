import { Publisher } from "./BasePublisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticketCreatedEvent";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
