import { TicketUpdatedEvent } from "@kmtickets/common";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { natsWrapper } from "../../../NatsWrapper";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { Ticket, TicketDoc } from "../../../models/ticket";

const setup = async (): Promise<{
  listener: TicketUpdatedListener;
  data: TicketUpdatedEvent["data"];
  msg: Message;
  ticket: TicketDoc;
}> => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = Ticket.build({ price: 999, title: "concert" });
  await ticket.save();
  const data: TicketUpdatedEvent["data"] = {
    id: ticket._id,
    userId: mongoose.Types.ObjectId().toHexString(),
    title: "new concert",
    price: 123,
    version: ticket.version + 1
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };
  return { listener, data, msg, ticket };
};

it("should find, update and save a ticket", async (): Promise<void> => {
  const { listener, data, msg, ticket } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket._id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("should ack the message", async (): Promise<void> => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
