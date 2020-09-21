import mongoose from "mongoose";
import jwt from "jsonwebtoken";
beforeAll(
  async (): Promise<void> => {
    process.env.JWT_KEY = "asdfasdf";

    await mongoose.connect("mongodb://127.0.0.1/test_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }
);

jest.mock("../NatsWrapper.ts");
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
    await mongoose.connection.close();
  }
);

export const signin = (): string[] => {
  const payload = {
    id: new mongoose.Types.ObjectId(),
    email: "test@test.com"
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = {
    jwt: token
  };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
