import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@kmtickets/common";

interface OrderAttrs {
  _id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

export interface OrderDoc extends mongoose.Document {
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

OrderSchema.set("versionKey", "version");

OrderSchema.plugin(updateIfCurrentPlugin);

OrderSchema.statics.build = (attrs: OrderDoc): mongoose.Document => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>("Order", OrderSchema);

export { Order };
