const authUtils = require("../utils/authUtils");
const { sendErrorResponse } = require("../helper/response.handler");

const deserializeUser = async (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return sendErrorResponse(res, "No token provided", 401);
  }
  const token = bearerToken.split(" ")[1];

  try {
    const decoded = await authUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return sendErrorResponse(res, "Invalid token", 401);
  }
};

module.exports = deserializeUser;
