const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    {
      expiresIn: "1h", // Token expires in 1 hour (adjust as needed)
    }
  );
};

// Function to verify a JWT token
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

// Function to hash a password using Bcrypt
const hashPassword = async (password) => {
  const saltRounds = 10; // You can adjust this value
  return await bcrypt.hash(password, saltRounds);
};

// Function to compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePassword,
  verifyToken,
};
