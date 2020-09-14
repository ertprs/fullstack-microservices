import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFound } from "./errors/NotFound";

const app = express();

app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// NOT FOUND ROUTE
app.get("*", (): void => {
  throw new NotFound();
});

// ERROR HANDLING
app.use(errorHandler);

app.listen(3000, (): void => console.log(`listening on port 3000`));
