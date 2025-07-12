import { CustomError } from "../utils/CustomError";
import { ValidationError } from "express-validator";

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(
    public errors: ValidationError[],
    message = `Invalid Request Validations`
  ) {
    super(message);

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  standarizedError() {
    return this.errors.map((err) => {
      const baseError = {
        statusCode: this.statusCode,
        success: false,
        message: err.msg,
        data: null as null,
      };
      if (err.type === "field") {
        return { ...baseError, field: err.path };
      }
      return baseError;
    });
  }
}

export { RequestValidationError };
