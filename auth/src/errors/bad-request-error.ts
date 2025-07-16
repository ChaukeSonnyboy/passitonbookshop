import { BAD_REQUEST } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";

class BadRequestError extends ApiError {
  statusCode = BAD_REQUEST;
  constructor(message = "Invalid data Provided!") {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { BadRequestError };
