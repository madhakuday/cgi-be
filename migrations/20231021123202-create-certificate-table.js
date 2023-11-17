"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Certificates", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Certificates");
  },
};
