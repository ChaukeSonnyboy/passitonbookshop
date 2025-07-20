import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../schemas/user-schema";
import { asyncHandler } from "../../utils/asyncHandler";
import { RequestValidationError } from "../../errors/req-validation-error";

const loginValidator = asyncHandler(
  async (req: Request, Res: Response, next: NextFunction) => {
    const validationResults = loginSchema.safeParse(req.body);

    if (!validationResults.success) {
      throw new RequestValidationError(validationResults.error);
    }
    req.body = validationResults.data;

    next();
  }
);

export { loginValidator };
