import { OrderStatus, TicketUpdatedEvent } from "@kmtickets/common";
import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Order } from "./order";

interface TicketAttrs {
  title: string;
  price: number;
  _id?: string;
}

export interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
  findByEvent(data: { id: string; version: number }): Promise<TicketDoc | null>;
}

const TicketSchema = new mongoose.Schema(
  {
    title: {
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
      transform(doc: any, ret: TicketDoc): void {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

TicketSchema.set("versionKey", "version");

TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.findByEvent = async (data: {
  id: string;
  version: number;
}): Promise<TicketDoc | null> => {
  return await Ticket.findOne({ _id: data.id, version: data.version - 1 });
};

TicketSchema.statics.build = (attrs: TicketAttrs): TicketDoc => {
  return new Ticket(attrs);
};

TicketSchema.methods.isReserved = async function (): Promise<boolean> {
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.Complete,
        OrderStatus.AwaitingPayment
      ]
    }
  });
  return !!existingOrder;
};

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", TicketSchema);

export { Ticket };
