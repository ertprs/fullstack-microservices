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
    return res.status(400).send({
      errors: err.errors.map(
        (error: ValidationError): errorResult => ({
          message: error.msg,
          field: error.param
        })
      )
    });
  }
  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }
  return res.status(400).send({ errors: [{ message: err.message }] });
};
