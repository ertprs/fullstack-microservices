import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Order } from "../../models/Order";
import { signin } from "../../test/setup";
import { OrderStatus } from "@kmtickets/common";

it("should return 404 if order doesnot exist", async (): Promise<void> => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({ orderId: mongoose.Types.ObjectId(), token: "jkjsljlds" })
    .expect(404);
});
it("should return 401 if order doesnot belong to user", async (): Promise<
  void
> => {
  const order = Order.build({
    _id: mongoose.Types.ObjectId().toHexString(),
    price: 1232,
    version: 0,
    status: OrderStatus.Created,
    userId: "1234"
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({ orderId: order.id, token: "lkjsdjs" })
    .expect(401);
});
it("should return 401 if order is cancelled", async (): Promise<void> => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    _id: mongoose.Types.ObjectId().toHexString(),
    price: 1232,
    version: 0,
    status: OrderStatus.Cancelled,
    userId: "1234"
  });
  await order.save();
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin(userId))
    .send({
      orderId: order.id,
      token: "lkjsdjs"
    })
    .expect(401);
});
