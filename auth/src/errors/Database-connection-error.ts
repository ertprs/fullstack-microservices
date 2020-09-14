export class DatabaseConnectionError extends Error {
  statusCode: number = 500;
  reason: string = "Error connecting to database";
  constructor() {
    super();
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeErrors(): { [key: string]: string }[] {
    return [{ message: this.reason }];
  }
}
