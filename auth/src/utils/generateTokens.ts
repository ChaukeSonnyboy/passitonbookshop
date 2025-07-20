import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user-model";
import logger from "./logger";

const generateTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new BadRequestError("Invalid Creditials Provided!");
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch {
    throw new Error("Something went wrong while gerating tokens!");
  }
};

export { generateTokens };
