import { OrderCreatedEvent, Publisher, Subjects } from "@kmtickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  protected subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
