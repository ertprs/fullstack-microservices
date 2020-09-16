import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface Jwt {
  email: string;
  id: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: Jwt;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as Jwt;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
