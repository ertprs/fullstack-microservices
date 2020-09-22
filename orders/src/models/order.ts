import mongoose from "mongoose";
import { OrderStatus } from "@kmtickets/common";
import { TicketDoc } from "./ticket";

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: string;
  ticket: TicketDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: string;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket"
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date
    }
  },
  {
    toJSON: {
      transform(doc, ret: OrderDoc): void {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

OrderSchema.statics.build = (attrs: OrderAttrs): OrderDoc => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
