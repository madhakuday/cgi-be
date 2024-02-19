const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");

const storage = require("../utils/fileStorage.config");

const multer = require("multer"); // Import Multer
const upload = multer({ storage });

const deserializeUser = require("../middleware/deserialize.middleware"); // User authentication middleware
const { isAdmin } = require("../middleware/checkRole.middleware"); // Admin role checking middleware
const { route } = require("./certificate.routes");

// Middleware for user authentication
router.use(deserializeUser);

// Create a user
router.post("/create-user", isAdmin, adminController.createUser);

// Update a user
router.put("/update-user/:id", isAdmin, adminController.updateUser);

// Read a user
router.get("/get-user/:id", isAdmin, adminController.getUserById);

// Delete a user
router.delete("/delete-user/:id", isAdmin, adminController.deleteUser);

// Create a banner
router.post(
  "/createBanner",
  isAdmin,
  upload.single("banner_image"),
  adminController.createBannerController
);

// Get all banners
router.get("/getAllBanners", isAdmin, adminController.getAllBannersController);

router.delete("/banner/:id", isAdmin, adminController.deleteBannerController);

// Get all users
router.get("/getAllUsers", isAdmin, adminController.getAllUsersController);

module.exports = router;
