import mongoose from "mongoose";

interface OrderAttrs {
  userId: string;
  status: string;
  expiresAt: string;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: string;
  expiresAt: string;
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
      required: true
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
