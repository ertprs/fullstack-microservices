import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

export const genTickets = async (): Promise<request.Test> => {
  return await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "jsldhkjfshjk", price: 1232 })
    .expect(201);
};

it("can fetch a list of tickets", async (): Promise<void> => {
  await genTickets();
  await genTickets();
  await genTickets();
  const res = await request(app).get("/api/tickets");
  expect(res.body.length).toEqual(3);
});
