import { RequestHandler } from "express";
import { User } from "../models/user-model";
import {
  asyncHandler,
  BadRequestError,
  OK,
  ApiResponse,
} from "@scbooks/common";

//Controller/Handler to logout a user
const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
  const loggedInUser = req.currentUser;

  if (!loggedInUser) {
    throw new BadRequestError("User not Loggedin!");
  }

  await User.findByIdAndUpdate(
    loggedInUser.id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  } as const;

  res
    .status(OK)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(OK, "User loggedout Successfully!", {}));
});

export { logoutUser };
