import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user-model";
import logger from "./logger";

const generateTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      logger.info("You went through to this error");
      throw new BadRequestError("Invalid Creditials Provided!");
    }
    logger.info("You got the user with the id!");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    logger.info(
      `tokens generates accessToken${accessToken}, refreshToken ${refreshToken}`
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch {
    throw new Error("Something went wrong while gerating tokens!");
  }
};

export { generateTokens };
