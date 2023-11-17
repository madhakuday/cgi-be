const authUtils = require("../utils/authUtils"); // Import the auth utility functions
const usersRepo = require("../repos/users_repo");
const bannerRepo = require("../repos/banner_repo");
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
  try {
    const existingUser = await usersRepo.isEmailExists(userData.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash the password
    const hashedPassword = await authUtils.hashPassword(userData.password);

    // Create the user with the hashed password
    const newUser = await usersRepo.createUser({
      username: userData.username,
      email: userData.email,
      password: hashedPassword, // Store the hashed password
    });

    return newUser;
  } catch (error) {
    throw error;
  }
  // Check if the email already exists
};

const updateUser = async (userId, userData) => {
  try {
    // Hash the password
    const hashedPassword = await authUtils.hashPassword(userData.password);
    // Create the user with the hashed password
    const updatedUser = await usersRepo.updateUser(userId, {
      username: userData.username,
      email: userData.email,
      password: hashedPassword, // Store the hashed password
    });

    return updatedUser;
  } catch (error) {
    console.log(error);
    // Handle the error
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await usersRepo.getUserById(userId);
    return user;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const rowsDeleted = await usersRepo.deleteUser(userId);
    return rowsDeleted;
  } catch (error) {
    // Handle the error
    throw error;
  }
};

const createBanner = async (bannerImageLink) => {
  try {
    // Call the repository function to insert the banner into the database
    const banner = await bannerRepo.createBanner({
      imageLink: bannerImageLink,
    });

    return banner;
  } catch (error) {
    throw error;
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerRepo.getAllBanners();
    return banners;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  createBanner,
  getAllBanners,
};
