import mongoose from "mongoose";
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
