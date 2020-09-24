import { OrderStatus } from "@kmtickets/common";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { natsWrapper } from "../../NatsWrapper";
import { signin } from "../../test/setup";
it("should marks an order as cancelled", async (): Promise<void> => {
  const ticket = Ticket.build({
    title: "ticket",
    price: 12332,
    _id: mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  const user = signin();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: updatedOrder } = await request(app)
    .delete(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .expect(200);
  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
});

it("emits an order cancelled event", async (): Promise<void> => {
  const ticket = Ticket.build({
    title: "ticket",
    price: 12332,
    _id: mongoose.Types.ObjectId().toHexString()
  });
  await ticket.save();
  const user = signin();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  const { body: updatedOrder } = await request(app)
    .delete(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .expect(200);
  expect(updatedOrder.status).toEqual(OrderStatus.Cancelled);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
