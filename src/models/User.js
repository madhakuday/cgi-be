const Sequelize = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define(
  'Users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false, // Username is required
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // Email is required
      unique: true, // Email should be unique
      validate: {
        isEmail: true, // Validate that the email is in the correct format
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false, // Password is required
    },
    active: {
      type: Sequelize.BOOLEAN,
      defaultValue: true, // Default value is true (active)
    },
    role: {
      type: Sequelize.STRING,
      defaultValue: 'user', // Default role is "user"
    },
  },
  {
    timestamps: false, // Disable automatic timestamps since you have your own columns
    underscored: true, // Use snake_case for column names (optional)
    tableName: 'Users', // Specify the table name (optional)
  }
);

module.exports = User;
