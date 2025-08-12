import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class PRODUCT extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PRODUCT.belongsTo(models.Category)
    }
  }
  PRODUCT.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product', 
  });
  
  return PRODUCT;
};