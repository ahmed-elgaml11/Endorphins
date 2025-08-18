"use strict";
const { Model } = require("sequelize");

export default (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // CartItem belongs to Cart
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cartId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // CartItem belongs to Product
      CartItem.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  CartItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "CartItem",
      tableName: "cartItems",
      timestamps: true,
    }
  );

  return CartItem;
};
