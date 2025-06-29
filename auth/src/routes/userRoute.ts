import express from "express";


const router = express.Router();

//Endpoint to create/register a new user
router.post("/register", (req, res) => {

  res.send(`Welcome to the registration/signup route!`);
  
});

//Endpoint to signin a user
router.post("/login", (req, res) => {

  res.send(`Welcome to the login route!`);
  
});

//Endpoint to logout a user
router.post("/logout", (req, res) => {

  res.send(`Welcome to the logout route!`);
  
});

//Endpoint to get a loggedin user info
router.get("/loggeduser", (req, res) => {

  res.send(`Welcome to the loggedin user route!`);
  
});

export default router;