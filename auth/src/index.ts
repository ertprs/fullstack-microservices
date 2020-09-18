import mongoose from "mongoose";
import { app } from "./app";

const start = async (): Promise<void> => {
  try {
    if (!process.env.JWT_KEY || !process.env.MONGO_URI) {
      throw new Error("ENV VARIABLES MUST BE PROVIDED");
    }
    await mongoose.connect(process.env.MONGO_URI, {
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
