"use strict";
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // CartItem belongs to Cart
      CartItem.belongsTo(models.Cart, {
        foreignKey: "CartId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // CartItem belongs to Product
      CartItem.belongsTo(models.Product, {
        foreignKey: "ProductId",
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
      CartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductId: {
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
      tableName: "CartItems",
      timestamps: true,
    }
  );

  return CartItem;
};
