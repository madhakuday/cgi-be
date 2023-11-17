const multer = require("multer"); // Import Multer
const crypto = require("crypto");

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded files
    cb(null, "uploads/"); // Replace "uploads/" with your desired file storage path
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using crypto
    const uniqueSuffix = crypto.randomBytes(16).toString("hex");
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

module.exports = storage;
