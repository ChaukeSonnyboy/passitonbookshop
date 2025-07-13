import { ApiError } from "../utils/ApiError";
import { ValidationError } from "express-validator";

class RequestValidationError extends ApiError {
  statusCode = 400;

  constructor(
    public errors: ValidationError[],
    message = `Invalid Request Validations`
  ) {
    super(message);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.errors.map((err) => {
      if (err.type === `field`) {
        return { message: err.msg, field: err.path };
      }

      return { message: err.msg };
    });
  }
}

export { RequestValidationError };
