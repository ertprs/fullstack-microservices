import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
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

export { app };
