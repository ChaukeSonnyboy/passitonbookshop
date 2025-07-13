import { ApiError } from "../utils/ApiError";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //Handling all the errors from the custom ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode).send(err.standarizedError());
    return;
  }

  res.status(500).json({
    statusCode: 500,
    success: false,
    errors: [{ message: err.message || "Unexpected Error Occured!" }],
    data: null,
  });
};

export { errorHandler };
