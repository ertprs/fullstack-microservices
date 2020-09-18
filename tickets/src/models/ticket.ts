import mongoose from "mongoose";

interface TicketAttrs {
  title: string;
  price: string;
  userId: string;
}

interface TicketDoc extends mongoose.Document {
  title: string;
  price: string;
  userId: string;
}

interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}
