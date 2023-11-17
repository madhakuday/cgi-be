const User = require("../models/User"); // Import the User model

// Create a user
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.log(user);
    throw new Error("Error creating user");
  }
};

// Update a user by ID
const updateUser = async (userId, userData) => {
  const [rowsUpdated] = await User.update(userData, {
    where: { id: userId },
  });

  if (rowsUpdated === 0) {
    throw new Error("User not found");
  }

  const updatedUser = await getUserById(userId);

  return updatedUser;
};

// Get a user by ID
const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// Delete a user by ID
const deleteUser = async (userId) => {
  try {
    const deletedRows = await User.destroy({ where: { id: userId } });
    console.log("Rows deleted", deletedRows);
    if (deletedRows === 0) {
      throw new Error("No user with that id exists");
    }
    return deletedRows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Get a user by email
const getUserByEmail = async (email) => {
  console.log(email);

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("User not found by email");
  }
  return user;
};

// Check if an email already exists
const isEmailExists = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user !== null; // Return true if the user exists, otherwise false
  } catch (error) {
    throw new Error("Error checking email existence");
  }
};

module.exports = {
  createUser,
  updateUser,
  getUserById,
  deleteUser,
  getUserByEmail,
  isEmailExists,
};
