import { Request, Response, Router } from "express";
const route = Router();

route.post("/api/users/sigup", (req: Request, res: Response): void => {});

export { route as signUpRouter };
