import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: { [key: string]: string | number };
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];
  private client: Stan;
  constructor(client: Stan) {
    this.client = client;
  }
  publish(data: T["data"]): void {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log("Event published");
    });
  }
}
