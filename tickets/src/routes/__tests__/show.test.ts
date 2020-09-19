import request from "supertest";
import { app } from "../../app";

it("returns a 404 if ticket not found", async (): Promise<void> => {
  await request(app).get("/api/tickets/kjsgdkjhdsfh").expect(404);
});
it("returns a 200 if ticket is found", async (): Promise<void> => {
  const title = "kjhkjdshjkfds";
  const price = 12334;
  const res = await request(app)
    .post("/api/tickets")
    .send({ title, price })
    .expect(201);
  const tickRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .expect(200);
  expect(tickRes.body.title).toEqual(res.body.title);
  expect(tickRes.body.price).toEqual(res.body.price);
});
