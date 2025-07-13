import { ApiError } from "../utils/ApiError";

class DatabaseConnectionError extends ApiError {
  statusCode = 500;

  constructor(message = `Error connecting to the Database!!`) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeError() {
    return [{ message: this.message }];
  }
}

export { DatabaseConnectionError };
