import {
  asyncHandler,
  BadRequestError,
  OK,
  ApiResponse,
  logger,
} from "@scbooks/common";
import { RequestHandler } from "express";
import { User } from "../models/user-model";
import { generateTokens } from "../utils/generateTokens";

//Controller/Handler to signin a user
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check if user with the provided email is registered
  const registeredUser = await User.findOne({ email });

  if (!registeredUser) {
    logger.error("User with provided Email not found!");
    throw new BadRequestError("Invalid credentials  provided!");
  }

  //Validate the provided password
  const isPasswordValid = await registeredUser.verifyPassword(password);

  if (!isPasswordValid) {
    logger.error("Password Incorrect!");
    throw new BadRequestError("Invalid credentials provided!");
  }

  //Generate tokens
  const { accessToken, refreshToken } = await generateTokens(registeredUser.id);

  const options = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  } as const;

  res
    .status(OK)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(OK, "User loggedin successfully!", registeredUser));
});

export { loginUser };
