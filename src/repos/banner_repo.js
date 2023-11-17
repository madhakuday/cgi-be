const Banner = require("../models/Banner"); // Import the Banners model

// Function to create a new banner
const createBanner = async (data) => {
  try {
    const banner = await Banner.create(data);
    return banner;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating banner");
  }
};

// Function to get all banners
const getAllBanners = async () => {
  try {
    const banners = await Banner.findAll();
    if (banners.length === 0) {
      throw new Error("No banners exist");
    }
    return banners;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBanner,
  getAllBanners,
};
