import Queue from "bull";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST
  }
});
expirationQueue.process(
  async (job): Promise<void> => {
    console.log(
      "I want to publish an expiration:complete event for order id",
      job.data.orderId
    );
  }
);

export { expirationQueue };
