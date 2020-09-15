import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFound } from "./errors/NotFound";

const app = express();

app.set("trust proxy", true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: true,
    sameSite: true
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// NOT FOUND ROUTE
app.all(
  "*",
  async (): Promise<void> => {
    throw new NotFound();
  }
);

// ERROR HANDLING
app.use(errorHandler);

const start = async (): Promise<void> => {
  try {
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
