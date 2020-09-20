import { randomBytes } from "crypto";
import nats, { Message, Stan } from "node-nats-streaming";
import { TicketCreatedListener } from "./events/TicketCreatedListener";

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222"
});

stan.on("connect", (): void => {
  stan.on("close", () => {
    console.log("NATS connection closed");
    process.exit();
  });
  new TicketCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
