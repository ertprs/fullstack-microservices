import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

beforeAll(
  async (): Promise<void> => {
    process.env.JWT_KEY = "asdfasdf";
    const mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
);

beforeEach(
  async (): Promise<void> => {
    const collections = await mongoose.connection.db.collections();
    collections.forEach(
      async (collection): Promise<void> => {
        await collection.deleteMany({});
      }
    );
  }
);

afterAll(
  async (): Promise<void> => {
    await mongo.stop();
    await mongoose.connection.close();
  }
);
