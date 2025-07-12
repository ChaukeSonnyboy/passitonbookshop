import { CustomError } from "../utils/CustomError";

class DatabaseConnectionError extends CustomError {
  statusCode = 500;

  constructor(message = `Error connecting to the Database!!`) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  standarizedError() {
    return [
      {
        statusCode: this.statusCode,
        success: false,
        message: this.message,
        data: null,
      },
    ];
  }
}

export { DatabaseConnectionError };
