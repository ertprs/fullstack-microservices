import mongoose from "mongoose";
import { app } from "./app";
import { ExpirationCompleteListener } from "./events/listeners/expiration-complete-listener";
import { PaymentCreatedListener } from "./events/listeners/payment-created-listener";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated-listener";
import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
    console.log("starting....");
    if (!process.env.JWT_KEY || !process.env.MONGO_URI) {
      throw new Error("JWT_KEY MUST BE PROVIDED");
    }
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI MUST BE PROVIDED");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("MONGO_URI MUST BE PROVIDED");
    }
    if (!process.env.NATS_URL) {
      throw new Error("MONGO_URI MUST BE PROVIDED");
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("MONGO_URI MUST BE PROVIDED");
    }
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", (): void => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", (): void => natsWrapper.client.close());
    process.on("SIGTERM", (): void => natsWrapper.client.close());
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();
    new ExpirationCompleteListener(natsWrapper.client).listen();
    new PaymentCreatedListener(natsWrapper.client).listen();
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to db");
    app.listen(3000, (): void => console.log(`listening on port 3000`));
  } catch (error) {
    console.log(error);
  }
};

start();
