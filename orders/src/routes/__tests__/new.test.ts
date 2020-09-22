import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { signin } from "../../test/setup";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";
import { OrderStatus } from "@kmtickets/common";

it("should return an error if ticket doesnot exist", async (): Promise<
  void
> => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId })
    .expect(404);
});
it("should return an error if ticket is already reserved", async (): Promise<
  void
> => {
  const ticket = Ticket.build({ title: "new ticket", price: 123 });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "kjshjds",
    expiresAt: new Date(),
    status: OrderStatus.Created
  });
  await order.save();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId: ticket.id });
  expect(res.status).toEqual(401);
});
it("should reserve a ticket", async (): Promise<void> => {
  const ticket = Ticket.build({ title: "new ticket", price: 123 });
  await ticket.save();
  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo("Emits a order created event");
