import { auth, NotAuthorizedError, NotFound } from "@kmtickets/common";
import { Router, Request, Response } from "express";
import { Order } from "../models/order";

const route = Router();

route.post(
  "/api/posts/:orderId",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      throw new NotFound();
    }
    if (order.userId !== req.currentUser?.id) {
      throw new NotAuthorizedError();
    }
    res.send(order);
  }
);

export { route as showRoute };
