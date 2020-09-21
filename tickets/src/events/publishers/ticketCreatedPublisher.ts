import { Publisher, Subjects, TicketCreatedEvent } from "@kmtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  protected subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
