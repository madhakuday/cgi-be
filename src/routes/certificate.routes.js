const express = require("express");
const crypto = require("crypto");

const multer = require("multer"); // Import Multer
const {
  createCertificateController,
  updateCertificateController,
  deleteCertificateController,
  getCertificateController,
} = require("../controllers/certificate.controller");
const deserializeUser = require("../middleware/deserialize.middleware");
const { isUser } = require("../middleware/checkRole.middleware");
const storage = require("../utils/fileStorage.config");

const router = express.Router();

const upload = multer({ storage });

// Create a certificate with image upload

// Middleware for user authentication
router.use(deserializeUser);

router.post(
  "/create",
  isUser,
  upload.single("certificate_image"),
  createCertificateController
);

// Get certificates
// Retrieves all certificate if admin and only user certificate if user
router.get("/getCertificates", getCertificateController);

// Update a certificate (requires admin role)
router.put(
  "/:id",
  upload.single("certificate_image"),
  updateCertificateController
);

// Delete a certificate by ID (requires admin role)
router.delete("/:id", deleteCertificateController);

module.exports = router;
