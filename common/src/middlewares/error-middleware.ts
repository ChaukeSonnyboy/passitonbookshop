import { INTERNAL_SERVER_ERROR } from "../constants/http-status-codes";
import { ApiError } from "../utils/ApiError";
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //Handling all the errors from the custom ApiError
  if (err instanceof ApiError) {
    res.status(err.statusCode).send(err.standarizedError());
    return;
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    statusCode: INTERNAL_SERVER_ERROR,
    success: false,
    errors: [{ message: err.message || "Unexpected Error Occured!" }],
    data: null,
  });
};

export { errorHandler };
