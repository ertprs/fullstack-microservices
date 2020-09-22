import express from "express";
import "express-async-errors";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFound } from "@kmtickets/common";
import { deleteRoute } from "./routes/delete";
import { newRoute } from "./routes/new";
import { showRoute } from "./routes/show";
import { indexRoute } from "./routes";

const app = express();

app.set("trust proxy", true);
app.use(bodyParser.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    sameSite: true
  })
);

app.use(indexRoute);
app.use(deleteRoute);
app.use(newRoute);
app.use(showRoute);

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
