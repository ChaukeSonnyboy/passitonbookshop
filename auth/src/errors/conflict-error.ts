import { ApiError } from "../utils/ApiError";

class ConflictError extends ApiError {
  statusCode = 409;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { ConflictError };
