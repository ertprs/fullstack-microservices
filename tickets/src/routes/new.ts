import { auth } from "@kmtickets/common";
import { Request, Response, Router } from "express";

const route = Router();

route.post("/api/tickets", auth, (req: Request, res: Response): void => {
  res.sendStatus(200);
});

export { route as newRoute };
