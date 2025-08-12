'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "pgcrypto";'
    );

    // 1. Add new UUID column
    await queryInterface.addColumn('Products', 'uuid_tmp', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      allowNull: false
    });

    await queryInterface.removeColumn('Products', 'id');

    await queryInterface.renameColumn('Products', 'uuid_tmp', 'id');

    await queryInterface.sequelize.query(`
      ALTER TABLE "Products" ADD PRIMARY KEY ("id");
    `);
  },

  async down(queryInterface, Sequelize) {
    // You could reverse the steps here if needed
  }
};
