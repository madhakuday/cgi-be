const { sendErrorResponse } = require("../helper/response.handler");

// Middleware to check if the user has admin role
const isAdmin = (req, res, next) => {
  const { role } = req.user; // Assuming role is stored in req.user
  if (role === "admin") {
    next(); // User has admin role, proceed to the next middleware/route
  } else {
    sendErrorResponse(res, "Permission denied. Admin role required.", 403);
  }
};

// Middleware to check if the user has the "user" role
const isUser = (req, res, next) => {
  const { role } = req.user; // Assuming role is stored in req.user
  if (role === "user") {
    next(); // User has the "user" role, proceed to the next middleware/route
  } else {
    sendErrorResponse(res, "Permission denied. User role required.", 403);
  }
};

module.exports = { isAdmin, isUser };
