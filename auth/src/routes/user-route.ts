import express from "express";
import {
  getLoggedInUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/auth-controller";

const router = express.Router();

//Endpoint to get a logged-in user info
router.route("/user").get(getLoggedInUser);

//Endpoint to create/register a new user
router.route("/register").post(registerUser);

//Endpoint to signin a user
router.route("/login").post(loginUser);

//Endpoint to signout a user
router.route("/logout").post(logoutUser);

export { router as userRouter };
