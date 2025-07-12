import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the loggedin user info route!`);
});

//Controller/Handler to create/register a new user
const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the registration/signup route!`);
});

//Controller/Handler to signin a user
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the login route!`);
});

//Controller/Handler to logout a user
const logoutUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the logout route!`);
});

export { getLoggedInUser, registerUser, loginUser, logoutUser };
