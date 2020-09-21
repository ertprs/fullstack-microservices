import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
    if (!process.env.JWT_KEY || !process.env.MONGO_URI) {
      throw new Error("JWT_KEY MUST BE PROVIDED");
    }
    await natsWrapper.connect(
      "ticketing",
      "lksdjlkjfds",
      "http://nats-srv:4222"
    );
    natsWrapper.client.on("close", (): void => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", (): void => natsWrapper.client.close());
    process.on("SIGTERM", (): void => natsWrapper.client.close());
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
