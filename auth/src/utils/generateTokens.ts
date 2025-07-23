import { BadRequestError } from "@scbooks/common";
import { User } from "../models/user-model";

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
