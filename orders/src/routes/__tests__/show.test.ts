import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";
import { signin } from "../../test/setup";

it("should fetch the order for a specific user", async (): Promise<void> => {
  const ticket = Ticket.build({ title: "ticket", price: 123 });
  await ticket.save();
  const user = signin();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set("Cookie", user)
    .expect(200);
  expect(fetchedOrder.id).toEqual(res.body.id);
});

it("should not fetch another users order", async (): Promise<void> => {
  const ticket = Ticket.build({ title: "ticket", price: 123 });
  await ticket.save();
  const user = signin();
  const res = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);
  await request(app)
    .get(`/api/orders/${res.body.id}`)
    .set("Cookie", signin())
    .expect(401);
});
