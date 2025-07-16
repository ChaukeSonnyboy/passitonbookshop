import { User } from "../models/user-model";
import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import logger from "../utils/logger";
import { ConflictError } from "../errors/conflict-error";
import { ApiResponse } from "../utils/ApiResponse";
import { CREATED } from "../constants/http-status-codes";
import { DatabaseConnectionError } from "../errors/db-connection-error";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the loggedin user info route!`);
});

//Controller/Handler to create/register a new user
const registerUser: RequestHandler = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const registredUser = await User.findOne({ email });

  if (registredUser) {
    logger.error(`User with email:  ${email} already exists!`);
    throw new ConflictError(`User with email: ${email} already exists!`);
  }

  const user = User.build({ firstname, lastname, email, password });
  await user.save();

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    logger.error(`Soething went wrong while creating a new user!`);
    throw new DatabaseConnectionError(`User creation failed!`);
  }

  logger.info(`User creation was a success!`);

  res
    .status(CREATED)
    .send(new ApiResponse(CREATED, `User created successfully!`, user));
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
