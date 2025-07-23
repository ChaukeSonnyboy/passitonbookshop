import { Request, NextFunction, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import { BadRequestError } from "../errors/bad-request-error";
import { UnauthorizedError } from "../errors/not-authorised-error";
import { logger } from "../utils/logger";
import jwt from "jsonwebtoken";

interface payload {
  id: string;
  firstname: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser: payload;
    }
  }
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new UnauthorizedError("Not Authorised, Please login!");
    }

    try {
      const payload = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET!
      ) as payload;

      logger.info(`Here is the verified payload: ${payload}`);

      req.currentUser = payload;
    } catch (error) {
      throw new BadRequestError("Invalid access token pro");
    }

    next();
  }
);

export { protect };
