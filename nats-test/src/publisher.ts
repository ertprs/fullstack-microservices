import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/TicketCreatedPublisher";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222"
});

stan.on(
  "connect",
  async (): Promise<void> => {
    console.log("publisher connected to NATS");
    const publisher = new TicketCreatedPublisher(stan);
    try {
      await publisher.publish({
        id: "123",
        title: "concert",
        price: 20,
        userId: "kjsdhsdf"
      });
    } catch (error) {
      console.log(error);
    }
  }
);
