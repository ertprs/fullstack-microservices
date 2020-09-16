import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { currentUser } from "../middlewares/current-user";
const route = Router();

route.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response): void => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { route as currentUserRouter };
