import mongoose from "mongoose";
import { app } from "./app";

const start = async (): Promise<void> => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY MUST BE PROVIDED");
    }
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("connected to db");
    app.listen(3000, (): void => console.log(`listening on port 3000`));
  } catch (error) {
    console.log(error.reason.servers);
  }
};

start();
