import { CustomError } from "./CustomError";

export class DatabaseConnectionError extends CustomError {
  statusCode: number = 500;
  reason: string = "Error connecting to database";
  constructor() {
    super("Error connecting to db");
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors(): { message: string }[] {
    return [{ message: this.reason }];
  }
}
