import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  protected abstract subject: T["subject"];
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  publish(data: T["data"]): Promise<unknown> {
    return new Promise((resolve, reject): void => {
      this.client.publish(this.subject, JSON.stringify(data), (err): void => {
        if (err) {
          reject(err);
        }
        console.log("Event published to subject", this.subject);
        resolve();
      });
    });
  }
}
