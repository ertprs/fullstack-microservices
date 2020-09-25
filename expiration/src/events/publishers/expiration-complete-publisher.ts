import { ExpirationComplete, Publisher, Subjects } from "@kmtickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete> {
  protected subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
