import { NextFunction, Request, Response } from "express";
import { ValidationError } from "express-validator";
import { DatabaseConnectionError } from "../errors/Database-connection-error";
import { RequestValidationError } from "../errors/Request-validation-error";

interface errorResult {
  message: string;
  field?: string;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({
      errors: err.serializeErrors()
    });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  return res.status(400).send({ errors: [{ message: err.message }] });
};
