import { User } from "../models/user-model";
import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import logger from "../utils/logger";
import { ConflictError } from "../errors/conflict-error";
import { ApiResponse } from "../utils/ApiResponse";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the loggedin user info route!`);
});

//Controller/Handler to create/register a new user
const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const registredUser = await User.findOne({ email });

  if (registredUser) {
    logger.error(`User with eamil:  ${email} already exists!`);
    throw new ConflictError(`User with email: ${email} already exists!`);
  }

  const user = User.build({ firstname, lastname, email, password });
  await user.save();

  res
    .status(201)
    .send(new ApiResponse(201, `User Created Successfully!`, user));

  // res.send(`Welcome to the registration/signup route!`);
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
