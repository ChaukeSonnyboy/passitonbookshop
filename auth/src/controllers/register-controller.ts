import { User } from "../models/user-model";
import { asyncHandler } from "../utils/asyncHandler";
import { ConflictError } from "../errors/conflict-error";
import { RequestHandler } from "express";
import logger from "../utils/logger";
import { DatabaseConnectionError } from "../errors/db-connection-error";
import { CREATED } from "../constants/http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";

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

export { registerUser };
