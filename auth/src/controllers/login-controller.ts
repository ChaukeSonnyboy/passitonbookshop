import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import { ApiResponse } from "../utils/ApiResponse";

import {
  OK,
  FORBIDDEN,
  UNAUTHORIZED,
  BAD_REQUEST,
} from "../constants/http-status-codes";

//Controller/Handler to signin a user
const loginUser: RequestHandler = asyncHandler(async (req, res) => {
  res.send(`Welcome to the login route!`);
});

export { loginUser };
