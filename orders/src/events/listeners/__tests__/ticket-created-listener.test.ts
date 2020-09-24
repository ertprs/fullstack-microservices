import { TicketCreatedEvent } from "@kmtickets/common";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../NatsWrapper";
import { TicketCreatedListener } from "../ticket-created-listener";

const setup = async (): Promise<{
  listener: TicketCreatedListener;
  data: TicketCreatedEvent["data"];
  msg: Message;
}> => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 123
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg };
};

it("should create and save a ticket", async (): Promise<void> => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  const ticket = await Ticket.findById(data.id);
  expect(ticket).toBeDefined();
  expect(ticket!.title).toBe(data.title);
  expect(ticket!.price).toBe(data.price);
});
