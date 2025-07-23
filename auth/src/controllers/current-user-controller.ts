import { asyncHandler, ApiResponse, OK } from "@scbooks/common";
import { RequestHandler } from "express";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  const currentUser = req.currentUser;

  res
    .status(OK)
    .json(
      new ApiResponse(OK, "Here are the loggedin user details", currentUser)
    );
});

export { getLoggedInUser };
