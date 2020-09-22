import { OrderCancelledEvent, Publisher, Subjects } from "@kmtickets/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  protected subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
