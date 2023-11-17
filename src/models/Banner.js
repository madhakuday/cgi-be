const Sequelize = require("sequelize");
const sequelize = require("../database/db");

const Banner = sequelize.define("Banners", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  imageLink: {
    type: Sequelize.STRING,
    allowNull: false, // The image link is required
  },
});

module.exports = Banner;
