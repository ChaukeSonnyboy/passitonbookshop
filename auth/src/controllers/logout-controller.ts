import { RequestHandler } from "express";
import { asyncHandler } from "../utils/asyncHandler";

//Controller/Handler to logout a user
const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the logout route!`);
});

export { logoutUser };
