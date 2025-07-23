import { User } from "../models/user-model";
import {
  asyncHandler,
  ConflictError,
  logger,
  InternalServerError,
  CREATED,
  ApiResponse,
} from "@scbooks/common";
import { RequestHandler } from "express";

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
    logger.error(`Something went wrong while creating a new user!`);
    throw new InternalServerError(`User creation failed!`);
  }

  logger.info(`User creation was a success!`);

  res
    .status(CREATED)
    .send(new ApiResponse(CREATED, `User created successfully!`, user));
});

export { registerUser };
