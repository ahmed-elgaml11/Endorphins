import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User);
      Cart.hasOne(models.Order, {
        foreignKey: {
          name: "CartId",
          allowNull: true,   
        },
        onDelete: "SET NULL",  
        hooks: true,           
      }); Cart.belongsToMany(models.Product, { through: 'CartItems' });
    }
  }
  Cart.init({
    UserId: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};