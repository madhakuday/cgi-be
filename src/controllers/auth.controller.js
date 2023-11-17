const authService = require("../services/auth.service"); // Import the authentication service
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helper/response.handler");

// Register Controller

const registerController = async (req, res) => {
  try {
    const { username, email, password, role = "admin" } = req.body;
    const payload = {
      username,
      email,
      password,
      role,
    };
    const newUser = await authService.register(payload);
    sendSuccessResponse(res, newUser, 201);
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Login controller
const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.login(email, password);
    sendSuccessResponse(res, { token });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, "Login failed", 401); // Unauthorized
  }
};

module.exports = {
  loginController,
  registerController,
};
