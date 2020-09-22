import {
  auth,
  NotAuthorizedError,
  NotFound,
  OrderStatus
} from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { Order } from "../models/order";

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

    res.send(order);
  }
);

export { route as deleteRoute };
