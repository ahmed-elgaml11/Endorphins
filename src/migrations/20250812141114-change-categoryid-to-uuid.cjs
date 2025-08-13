'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'CREATE EXTENSION IF NOT EXISTS "pgcrypto";'
    );

    // Add UUID column to Categories
    await queryInterface.addColumn('Categories', 'uuid_tmp', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
      allowNull: false
    });

    // Add UUID column to Products for categoryId
    await queryInterface.addColumn('Products', 'category_uuid_tmp', {
      type: Sequelize.UUID,
      allowNull: true
    });

    // Copy relationships from old int IDs
    await queryInterface.sequelize.query(`
      UPDATE "Products"
      SET category_uuid_tmp = c.uuid_tmp
      FROM "Categories" c
      WHERE "Products"."CategoryId" = c."id";
    `);

    // Drop old foreign key
    // await queryInterface.removeConstraint('Products', 'Products_CategoryId_fkey');

    // Remove old columns
    await queryInterface.removeColumn('Products', 'CategoryId');
    await queryInterface.removeColumn('Categories', 'id');

    // Rename temp columns
    await queryInterface.renameColumn('Categories', 'uuid_tmp', 'id');
    await queryInterface.renameColumn('Products', 'category_uuid_tmp', 'categoryId');

    // Add new primary key
    await queryInterface.sequelize.query(`
      ALTER TABLE "Categories" ADD PRIMARY KEY ("id");
    `);

    // Re-add foreign key
    await queryInterface.addConstraint('Products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'Products_categoryId_fkey',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverse changes: drop UUID columns, restore integer IDs
    await queryInterface.addColumn('Categories', 'id_tmp', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false
    });

    await queryInterface.addColumn('Products', 'categoryId_tmp', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.sequelize.query(`
      UPDATE "Products"
      SET categoryId_tmp = c.id_tmp
      FROM "Categories" c
      WHERE "Products"."categoryId" = c."id";
    `);

    await queryInterface.removeConstraint('Products', 'Products_categoryId_fkey');

    await queryInterface.removeColumn('Products', 'categoryId');
    await queryInterface.removeColumn('Categories', 'id');

    await queryInterface.renameColumn('Categories', 'id_tmp', 'id');
    await queryInterface.renameColumn('Products', 'categoryId_tmp', 'categoryId');

    await queryInterface.sequelize.query(`
      ALTER TABLE "Categories" ADD PRIMARY KEY ("id");
    `);

    await queryInterface.addConstraint('Products', {
      fields: ['categoryId'],
      type: 'foreign key',
      name: 'Products_categoryId_fkey',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};
