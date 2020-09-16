import { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
const route = Router();

route.get("/api/users/currentuser", (req: Request, res: Response): void => {
  if (!req.session || !req.session.jwt) {
    res.send({ currentUser: null });
    return;
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    res.send({ currentUser: null });
  }
});

export { route as currentUserRouter };
