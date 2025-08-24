'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Drop foreign keys
    await queryInterface.removeConstraint('Orders', 'Orders_userId_fkey');
    await queryInterface.removeConstraint('Carts', 'Carts_userId_fkey');

    // 2. Change Users.id first (parent table)
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    });

    // 3. Change child columns
    await queryInterface.changeColumn('Orders', 'UserId', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Carts', 'UserId', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    // 4. Re-add foreign keys
    await queryInterface.addConstraint('Orders', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Orders_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Carts_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    // Drop the new foreign keys
    await queryInterface.removeConstraint('Orders', 'Orders_userId_fkey');
    await queryInterface.removeConstraint('Carts', 'Carts_userId_fkey');

    // Revert columns back to integer
    await queryInterface.changeColumn('Users', 'id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    });

    await queryInterface.changeColumn('Orders', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('Carts', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    // Restore old foreign keys
    await queryInterface.addConstraint('Orders', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Orders_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Carts_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
