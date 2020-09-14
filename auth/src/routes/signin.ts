import { Request, Response, Router } from "express";
const route = Router();

route.post("/api/users/sigin", (req: Request, res: Response): void => {});

export { route as signInRouter };
