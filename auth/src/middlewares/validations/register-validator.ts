import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../../errors/req-validation-error";
import { registerSchema } from "../../schemas/user-schema";
import { asyncHandler } from "../../utils/asyncHandler";

const registerValidator = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const validationResults = registerSchema.safeParse(req.body);

    if (!validationResults.success) {
      throw new RequestValidationError(validationResults.error);
    }

    req.body = validationResults.data;

    next();
  }
);

export { registerValidator };
