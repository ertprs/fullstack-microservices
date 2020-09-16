import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { Jwt } from "./current-user";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session?.jwt) {
    throw new NotAuthorizedError();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as Jwt;
    req.currentUser = payload;
    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
