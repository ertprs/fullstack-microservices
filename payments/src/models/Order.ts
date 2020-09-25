import mongoose from "mongoose";
import { OrderStatus } from "@kmtickets/common";

interface OrderAttrs {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderDoc extends mongoose.Document {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const OrderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true
    },
    version: {
      type: Number,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    toJSON: {
      transform(doc, ret: OrderDoc) {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

OrderSchema.statics.build = (attrs: OrderDoc): mongoose.Document => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
