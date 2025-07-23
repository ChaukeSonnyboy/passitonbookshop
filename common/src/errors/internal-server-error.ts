import { INTERNAL_SERVER_ERROR } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";

class InternalServerError extends ApiError {
  statusCode = INTERNAL_SERVER_ERROR;

  constructor(message = `Error connecting to the Database!!`) {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { InternalServerError };
