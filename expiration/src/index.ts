import { natsWrapper } from "./NatsWrapper";

const start = async (): Promise<void> => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

start();
