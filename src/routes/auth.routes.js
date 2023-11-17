const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Login route
router.post("/login", authController.loginController);

// Register Route for admin
router.post("/register", authController.registerController);

module.exports = router;
