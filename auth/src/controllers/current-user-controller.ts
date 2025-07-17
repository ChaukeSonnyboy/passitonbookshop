import jwt, { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../errors/not-authorised-error";
import { asyncHandler } from "../utils/asyncHandler";
import { RequestHandler } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/user-model";
import { OK } from "../constants/http-status-codes";
import { ApiResponse } from "../utils/ApiResponse";
import { InternalServerError } from "../errors/internal-server-error";

//Controller/Handler to get a loggedin user info
const getLoggedInUser: RequestHandler = asyncHandler(async (req, res) => {
  const incomingAccessToken = req.cookies.accessToken;

  if (!incomingAccessToken) {
    throw new UnauthorizedError("User not authorised, please login!");
  }

  const decodedToken = jwt.verify(
    incomingAccessToken,
    process.env.ACCESS_TOKEN_SECRET!
  ) as JwtPayload;

  if (!decodedToken) {
    throw new BadRequestError("Invalid access token provided!");
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    throw new InternalServerError(
      "Something went wrong while checking the loggedin user!"
    );
  }

  //TODO: Loggedin user to be sent to the request session/cookie...
  res
    .status(OK)
    .json(new ApiResponse(OK, "Here are the loggedin user details", user));
});

export { getLoggedInUser };
