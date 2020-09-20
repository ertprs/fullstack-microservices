import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "123", {
  url: "http://localhost:4222"
});

stan.on("connect", (): void => {
  console.log("listener connected to NATS");
  const subscription = stan.subscribe("ticket:created");
  subscription.on("message", (msg): void => {
    console.log("message received");
  });
});
