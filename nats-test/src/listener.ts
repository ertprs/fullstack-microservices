import { randomBytes } from "crypto";
import nats, { Message } from "node-nats-streaming";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222"
});

const options = stan.subscriptionOptions().setManualAckMode(true);

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
