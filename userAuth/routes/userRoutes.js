// ...existing code from backend\routes\userRoutes.js...
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  profileController,
  getAllUser,
} = require("../controllers/userController");
const { body } = require("express-validator");
const { isLoggedin } = require("../middlewares/isLoggedin");

const router = express.Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  registerUser
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  loginUser
);

router.get("/profile", isLoggedin, profileController);

router.get("/logout", isLoggedin, logoutUser);

router.get("/all", isLoggedin, getAllUser);

module.exports = router;
