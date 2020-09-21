import { Request, Response, Router } from "express";

const route = Router();

route.delete(
  "/api/orders/:orderId",
  async (req: Request, res: Response): Promise<void> => {}
);

export { route as deleteRoute };
