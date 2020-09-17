import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
beforeAll(
  async (): Promise<void> => {
    process.env.JWT_KEY = "asdfasdf";

    await mongoose.connect("mongodb://127.0.0.1/test_database", {
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
    await mongoose.connection.close();
  }
);

export const signin = async (): Promise<string[]> => {
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  return res.get("Set-Cookie");
};
