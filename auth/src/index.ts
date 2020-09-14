import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();

app.use(bodyParser.json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

app.listen(3000, (): void => console.log(`listening on port 3000`));
