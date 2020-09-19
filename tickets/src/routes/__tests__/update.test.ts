import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";
import { genTickets } from "./index.test";

it("returns a 404 if provided id doesnot exist", async (): Promise<void> => {
  await request(app)
    .put(`/api/tickets/${mongoose.Types.ObjectId()}`)
    .set("Cookie", signin())
    .send({ title: "ljshkjgs", price: 1223 })
    .expect(404);
});
it("returns a 401 if user not authenticated", async (): Promise<void> => {
  const price = 1232;
  const title = "jlhckjhskjfd";
  const res = await genTickets();
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .send({ price, title })
    .expect(401);
});
it("returns a 401 if user doesnot own the ticket", async (): Promise<
  void
> => {});
it("returns a 401 if invalid title or price provided", async (): Promise<
  void
> => {
  const res = await genTickets();
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", signin())
    .send({ price: "kjshkjsd", title: 127532 })
    .expect(401);
});
it("updates a ticket", async (): Promise<void> => {
  const res = await genTickets();
  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", signin())
    .send({ price: 1232, title: "ljsdhl" })
    .expect(200);
});
