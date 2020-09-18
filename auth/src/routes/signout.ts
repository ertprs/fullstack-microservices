import { auth } from "@kmtickets/common";
import { Request, Response, Router } from "express";
const route = Router();

route.post("/api/users/signout", auth, (req: Request, res: Response): void => {
  req.session = null;
  res.send({});
});

export { route as signOutRouter };
