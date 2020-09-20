import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222"
});

stan.on("connect", (): void => {
  console.log("publisher connected to NATS");
  const data = JSON.stringify({
    id: "123",
    title: "concert",
    price: 20
  });
  stan.publish("ticket:created", data, (): void =>
    console.log("event published")
  );
});
