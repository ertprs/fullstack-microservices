import {
  auth,
  NotAuthorizedError,
  NotFound,
  OrderStatus
} from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { OrderCancelledPublisher } from "../events/publishers/order-cancelled-publisher";
import { Order } from "../models/order";
import { natsWrapper } from "../NatsWrapper";

const route = Router();

route.delete(
  "/api/orders/:orderId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw new NotFound();
    }
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // EMIT AN ORDER CANCELLED EVENT
    new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      ticket: {
        id: order.ticket.id
      }
    });

    res.send(order);
  }
);

export { route as deleteRoute };
