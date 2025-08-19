"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Rename table from 'cartItems' to 'CartItems'
    await queryInterface.renameTable("cartItems", "CartItems");
  },

  async down(queryInterface, Sequelize) {
    // Revert the table name back if needed
    await queryInterface.renameTable("CartItems", "cartItems");
  },
};
