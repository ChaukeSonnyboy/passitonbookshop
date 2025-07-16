import { NOT_FOUND } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";

class NotFoundError extends ApiError {
  statusCode = NOT_FOUND;

  constructor(message = "Error 404!, Not found!") {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { NotFoundError };
