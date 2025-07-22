import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import { OK } from "../constants/http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";

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
