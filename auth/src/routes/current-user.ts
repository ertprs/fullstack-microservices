import { Request, Response, Router } from "express";
const route = Router();

route.get("/api/users/currentuser", (req: Request, res: Response): void => {
  res.send("hello there");
});

export { route as currentUserRouter };
