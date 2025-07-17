import { ApiError } from "../utils/ApiError";
import { UNAUTHORIZED } from "../constants/http-status-codes";

class UnauthorizedError extends ApiError {
  statusCode = UNAUTHORIZED;

  constructor(message = "Not Authorised!") {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { UnauthorizedError };
