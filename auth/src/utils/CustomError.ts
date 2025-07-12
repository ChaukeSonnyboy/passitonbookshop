abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract standarizedError(): {
    statusCode: number;
    success: boolean;
    message: string;
    field?: string;
    data: null;
  }[];
}

export { CustomError };
