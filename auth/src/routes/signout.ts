import { Request, Response, Router } from "express";
const route = Router();

route.post("/api/users/signout", (req: Request, res: Response): void => {
  req.session = null;
  res.send({});
});

export { route as signOutRouter };
