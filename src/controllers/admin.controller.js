const adminService = require("../services/admin.service");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helper/response.handler");
const { uploadImageToAWS } = require("../services/aws.service");
const { omitFields } = require("../utils/omitFields");

// Create a user
const createUser = async (req, res) => {
  try {
    const newUser = await adminService.createUser(req.body);
    sendSuccessResponse(
      res,
      {
        message: "New user created successfully",
        data: omitFields(newUser.dataValues),
      },
      201
    );
  } catch (error) {
    sendErrorResponse(res, error.message, 500);
  }
};

// Update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await adminService.updateUser(id, req.body);

    if (updatedUser) {
      sendSuccessResponse(res, {
        message: "User updated successfully",
        data: omitFields(updatedUser),
      });
    }
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Read a user
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await adminService.getUserById(id);
    if (user) {
      sendSuccessResponse(res, {
        message: "User fetched successfully",
        data: omitFields(user),
      });
    }
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const rowsDeleted = await adminService.deleteUser(id);
    if (rowsDeleted === 1) {
      sendSuccessResponse(res, { message: "User deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Create a banner
const createBannerController = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Banner image is required");
    }
    // Call the appropriate service function to create a banner
    // You can use adminService.createBanner(req.body) for this
    // Handle the response as needed and send a success or error response

    const bannerImage = req.file;
    const bannerImageLink = await uploadImageToAWS(bannerImage);
    const banner = await adminService.createBanner(bannerImageLink);
    sendSuccessResponse(res, {
      message: "Banner created successfully",
      data: omitFields(banner.dataValues),
    });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

// Get all banners
const getAllBannersController = async (req, res) => {
  try {
    // Call the appropriate service function to get all banners
    // You can use adminService.getAllBanners() for this
    // Handle the response as needed and send a success or error response
    const banners = await adminService.getAllBanners();
    sendSuccessResponse(res, omitFields(banners));
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, error.message, 500);
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    sendSuccessResponse(res, omitFields(users));
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error.message);
  }
};

const deleteBannerController = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await adminService.deleteBanner(bannerId);
    sendSuccessResponse(res, "Banner deleted successfully");
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error.message);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  createBannerController,
  getAllBannersController,
  getAllUsersController,
  deleteBannerController,
};
