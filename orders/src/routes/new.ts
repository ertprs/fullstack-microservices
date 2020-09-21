import { Request, Response, Router } from "express";

const route = Router();

route.post(
  "/api/post",
  async (req: Request, res: Response): Promise<void> => {}
);

export { route as newRoute };
