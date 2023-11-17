// response.js

// Function to send a success response
const sendSuccessResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

// Function to send an error response
const sendErrorResponse = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, error: message });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
