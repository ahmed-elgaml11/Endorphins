import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Cart.belongsTo(models.User, { foreignKey: 'userId' });
  Cart.hasOne(models.Order);  
  Cart.belongsToMany(models.Product, { through: 'cartItems' });
  }
  }
  Cart.init({
    userId: DataTypes.INTEGER,
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