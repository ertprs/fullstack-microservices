import { CustomError } from "./CustomError";
import { ErrorResult } from "./Request-validation-error";

export class NotFound extends CustomError {
  statusCode: number = 404;
  constructor() {
    super("route not found");
  }
  serializeErrors = (): ErrorResult[] => {
    return [{ message: "Route not found" }];
  };
}
