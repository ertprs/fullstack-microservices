import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";

interface errorResult {
  message: string;
  field?: string;
}

export class RequestValidationError extends CustomError {
  statusCode: number = 401;
  constructor(public errors: ValidationError[]) {
    super("validation failed");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map(
      (err: ValidationError): errorResult => ({
        message: err.msg,
        field: err.param
      })
    );
  }
}
