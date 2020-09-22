import { Router, Request, Response } from "express";

const route = Router();

route.post(
  "/api/posts/:postId",
  async (req: Request, res: Response): Promise<void> => {
    res.send({});
  }
);

export { route as showRoute };
