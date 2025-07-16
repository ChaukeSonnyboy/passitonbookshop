import { CONFLICT } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";

class ConflictError extends ApiError {
  statusCode = CONFLICT;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { ConflictError };
