import { Request, Response, Router } from "express";
const route = Router();

route.get(
  "/api/orders",
  async (req: Request, res: Response): Promise<void> => {}
);

export { route as indexRoute };
