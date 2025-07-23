abstract class ApiError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  abstract serializeError(): { message: string; field?: string }[];

  standarizedError() {
    return {
      statusCode: this.statusCode,
      success: false,
      errors: this.serializeError(),
      data: null,
    };
  }
}

export { ApiError };
