import mongoose from "mongoose";
import { app } from "./app";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
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
    new OrderCreatedListener(natsWrapper.client).listen();
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
