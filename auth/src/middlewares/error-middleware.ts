import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Handling all the errors from the custom errors
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.standarizedError() });
  }

  res.status(400).send({
    success: false,
    data: null,
    errors: [{ message: `Something Went Wrong!` }],
  });
};

export { errorHandler };
