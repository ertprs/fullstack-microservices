import { CustomError } from "./CustomError";
import { ErrorResult } from "./Request-validation-error";
export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = "Error connecting to database";
  constructor() {
    super("Error connecting to db");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors = (): ErrorResult[] => {
    return [{ message: this.reason }];
  };
}
