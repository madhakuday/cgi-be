const Sequelize = require("sequelize");
const sequelize = require("../database/db");
const User = require("./User");

const Certificate = sequelize.define("Certificate", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  cgi_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colour: {
    type: Sequelize.STRING,
  },
  weight: {
    type: Sequelize.FLOAT,
  },
  shape_cut: {
    type: Sequelize.STRING,
  },
  sr_dr: {
    type: Sequelize.STRING,
  },
  reflective_index: {
    type: Sequelize.FLOAT,
  },
  specific_gravity: {
    type: Sequelize.FLOAT,
  },
  inclusion: {
    type: Sequelize.STRING,
  },
  indian_name: {
    type: Sequelize.STRING,
  },
  certificate_image: {
    type: Sequelize.STRING,
  },
  certificate_type: {
    type: Sequelize.ENUM,
    values: ["Gemstones", "Diamond", "Ornaments"],
    validate: {
      isIn: {
        args: [["Gemstones", "Diamond", "Ornaments"]],
        msg: "Must be a valid certificate type",
      },
    },
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
    allowNull: false,
  },
});

module.exports = Certificate;
