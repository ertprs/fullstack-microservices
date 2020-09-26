import { PaymentCreatedEvent, Publisher, Subjects } from "@kmtickets/common";

export class PaymentCreated extends Publisher<PaymentCreatedEvent> {
  protected subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
