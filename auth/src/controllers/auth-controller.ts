import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the loggedin user info route!`);
});

export { getLoggedInUser };
