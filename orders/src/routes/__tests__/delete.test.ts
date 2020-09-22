import { OrderStatus } from "@kmtickets/common";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signin } from "../../test/setup";
it("should marks an order as cancelled", async (): Promise<void> => {
  const ticket = Ticket.build({ title: "ticket", price: 12332 });
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

it.todo("emits an order cancelled event");
