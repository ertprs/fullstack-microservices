import { auth, BadRequestError, NotAuthorizedError, NotFound, OrderStatus, validateRequest } from "@kmtickets/common";
import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { Order } from "../models/Order";

const route = Router();

route.post(
  "/api/payments",
  auth,
  body("orderId").notEmpty(),
  body("token").notEmpty(),
  validateRequest,
  async (req: Request, res: Response): Promise<void> => {
    const {orderId,token}=req.body
    const order=await Order.findById(orderId)
    if(!order){
      throw new NotFound()
    }
    if(order.userId!==req.currentUser?.id){
      throw new NotAuthorizedError()
    }
    if(order.status===OrderStatus.Cancelled){
      throw new BadRequestError("cannot pay for a cancelled order")
    }
    res.send({ message: "Success" });
  }
);
export { route as newRoute };
