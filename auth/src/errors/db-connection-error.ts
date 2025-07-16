import { INTERNAL_SERVER_ERROR } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";

class DatabaseConnectionError extends ApiError {
  statusCode = INTERNAL_SERVER_ERROR;

  constructor(message = `Error connecting to the Database!!`) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { DatabaseConnectionError };
