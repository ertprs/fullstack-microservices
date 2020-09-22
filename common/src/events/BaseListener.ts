import nats, { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

interface Event {
  subject: Subjects;
  data: { [key: string]: string | number };
}

export abstract class Listener<T extends Event> {
  protected abstract subject: T["subject"];
  protected abstract queueGroupName: string;
  private client: Stan;
  protected ackWait: number = 5 * 1000;
  protected abstract onMessage(data: T["data"], msg: Message): void;
  constructor(client: Stan) {
    this.client = client;
  }
  private subscriptionOptions(): nats.SubscriptionOptions {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDurableName(this.queueGroupName)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait);
  }
  listen(): void {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message): void => {
      console.log(`message received: ${this.subject}/${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  private parseMessage(msg: Message): { [key: string]: string } {
    const data = msg.getData();
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf-8"));
  }
}
