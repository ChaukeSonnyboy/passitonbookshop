import { Request, Response, NextFunction } from "express";
import { asyncHandler, RequestValidationError } from "@scbooks/common";
import { registerSchema } from "../../schemas/user-schema";

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
