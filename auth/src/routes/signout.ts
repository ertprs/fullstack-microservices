import { Request, Response, Router } from "express";
const route = Router();

route.post("/api/users/signout", (req: Request, res: Response): void => {});

export { route as signOutRouter };
