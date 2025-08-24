'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove unnecessary columns
    await queryInterface.removeColumn('Users', 'name');
    await queryInterface.removeColumn('Users', 'phone');
    await queryInterface.removeColumn('Users', 'address');
    await queryInterface.removeColumn('Users', 'password');
    await queryInterface.removeColumn('Users', 'isAdmin');
  },

  async down(queryInterface, Sequelize) {
    // Re-add the columns if you rollback
    await queryInterface.addColumn('Users', 'name', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'phone', {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.addColumn('Users', 'address', {
      type: Sequelize.STRING,
    });
    await queryInterface.addColumn('Users', 'password', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('Users', 'isAdmin', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
};
