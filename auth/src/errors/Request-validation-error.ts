import { ValidationError } from "express-validator";

interface errorResult {
  message: string;
  field?: string;
}

export class RequestValidationError extends Error {
  statusCode: number = 401;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): errorResult[] {
    return this.errors.map(
      (err: ValidationError): errorResult => ({
        message: err.msg,
        field: err.param
      })
    );
  }
}
