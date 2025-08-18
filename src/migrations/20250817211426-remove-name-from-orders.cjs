"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Orders", "name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Orders", "name", {
      type: Sequelize.STRING,
    });
  },
};
