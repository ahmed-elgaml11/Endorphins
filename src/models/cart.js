import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class CART extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  CART.belongsTo(models.User, { foreignKey: 'userId' });
  CART.hasOne(models.Order);  
  CART.belongsToMany(models.Product, { through: 'cartItems' });
  }
  }
  CART.init({
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active'
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return CART;
};