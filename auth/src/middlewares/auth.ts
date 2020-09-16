import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};
