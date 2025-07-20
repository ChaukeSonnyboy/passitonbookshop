import express from "express";
import { getLoggedInUser } from "../controllers/current-user-controller";
import { registerUser } from "../controllers/register-controller";
import { loginUser } from "../controllers/login-controller";
import { logoutUser } from "../controllers/logout-controller";
import { registerValidator } from "../middlewares/validations/register-validator";
import { loginValidator } from "../middlewares/validations/login-validator";

const router = express.Router();

//Endpoint to get a logged-in user info
router.route("/user").get(getLoggedInUser);

//Endpoint to create/register a new user
router.route("/register").post(registerValidator, registerUser);

//Endpoint to signin a user
router.route("/login").post(loginValidator, loginUser);

//Endpoint to signout a user
router.route("/logout").post(logoutUser);

export { router as userRouter };
