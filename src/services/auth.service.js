const authUtils = require("../utils/authUtils"); // Import the auth utility functions
const userRepo = require("../repos/users_repo"); // Import the user repository

const register = async (userData) => {
  // Check if the email already exists
  const existingUser = await userRepo.isEmailExists(userData.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash the password
  const hashedPassword = await authUtils.hashPassword(userData.password);

  // Create the user with the hashed password
  const newUser = await userRepo.createUser({
    username: userData.username,
    email: userData.email,
    password: hashedPassword, // Store the hashed password
    role: userData?.role || "admin",
  });

  return newUser;
};

const login = async (email, password) => {
  const user = await userRepo.getUserByEmail(email);

  console.log(user);

  if (!user) {
    throw new Error("User not found");
  }

  const passwordMatch = await authUtils.comparePassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  const token = authUtils.generateToken(user);

  return token;
};

module.exports = {
  login,

  // Registration for admin
  register,
};
