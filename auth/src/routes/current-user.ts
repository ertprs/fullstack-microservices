import { Request, Response, Router } from "express";
import { currentUser } from "@kmtickets/common";
const route = Router();

route.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response): void => {
    res.send({ currentUser: req.currentUser || null });
  }
);

export { route as currentUserRouter };
