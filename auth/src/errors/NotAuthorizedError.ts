import { CustomError } from "./CustomError";
import { ErrorResult } from "./Request-validation-error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  constructor() {
    super("Not Authorized");
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  serializeErrors(): ErrorResult[] {
    return [{ message: "Not Authorized" }];
  }
}
