import { Publisher, Subjects, TicketUpdatedEvent } from "@kmtickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  protected subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
