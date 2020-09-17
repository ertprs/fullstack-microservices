import { Request, Response, Router } from "express";
import { auth } from "../middlewares/auth";
const route = Router();

route.post("/api/users/signout", auth, (req: Request, res: Response): void => {
  req.session = null;
  res.send({});
});

export { route as signOutRouter };
