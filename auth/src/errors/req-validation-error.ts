import { BAD_REQUEST } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

class RequestValidationError extends ApiError {
  statusCode = BAD_REQUEST;

  constructor(
    public errors: ZodError,
    message = `Invalid Request Validations`
  ) {
    super(message);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.issues.map((issue) => {
      return {
        message: issue.message,
        field: issue.path.join("."),
      };
    });
  }
}

export { RequestValidationError };
