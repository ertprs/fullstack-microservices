import { randomBytes } from "crypto";
import nats, { Message, Stan } from "node-nats-streaming";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222"
});

const options = stan
  .subscriptionOptions()
  .setManualAckMode(true)
  .setDeliverAllAvailable()
  .setDurableName("accounting-service");

stan.on("connect", (): void => {
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  console.log("listener connected to NATS");
  const subscription = stan.subscribe(
    "ticket:created",
    "order-service-queue-group",
    options
  );
  subscription.on("message", (msg: Message): void => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(`received event: ${msg.getSequence()}, with data: ${data}`);
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  private client: Stan;
  protected ackWait: number = 5 * 1000;
  abstract onMessage(data: { [key: string]: string }, msg: Message): void;
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
