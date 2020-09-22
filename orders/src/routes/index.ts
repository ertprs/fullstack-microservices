import { auth } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { Order } from "../models/order";
const route = Router();

route.get(
  "/api/orders",
  auth,
  async (req: Request, res: Response): Promise<void> => {
    const orders = await Order.find({ userId: req.currentUser?.id }).populate(
      "ticket"
    );
    res.send(orders);
  }
);

export { route as indexRoute };
