import {
  auth,
  BadRequestError,
  NotAuthorizedError,
  NotFound,
  OrderStatus,
  validateRequest
} from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { PaymentCreated } from "../events/publishers/PaymentCreatedPublisher";
import { Order } from "../models/Order";
import { Payment } from "../models/Payments";
import { natsWrapper } from "../NatsWrapper";
import { stripe } from "../stripe";

const route = Router();

route.post(
  "/api/payments",
  auth,
  body("orderId").notEmpty(),
  body("token").notEmpty(),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const { orderId, token } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFound();
    }
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("cannot pay for a cancelled order");
    }
    const { id } = await stripe.charges.create({
      amount: order.price * 100,
      currency: "ksh",
      source: token
    });
    const payment = Payment.build({ orderId: order.id, stripeId: id });
    await payment.save();
    new PaymentCreated(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId
    });
    res.status(201).send(payment);
  }
);
export { route as newRoute };
