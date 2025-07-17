import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import { User } from "../models/user-model";
import { NotFoundError } from "../errors/not-found-error";
import { BadRequestError } from "../errors/bad-request-error";
import { generateTokens } from "../utils/generateTokens";
import { OK } from "../constants/http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import logger from "../utils/logger";

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

  const { accessToken, refreshToken } = await generateTokens(registeredUser.id);

  const options = {
    httpOnly: true,
    sameSite: "strict",
    secure: false, //process.env.NODE_ENV === "production",
  } as const;

  res
    .status(OK)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(OK, "User loggedin successfully!", registeredUser));
});

export { loginUser };
