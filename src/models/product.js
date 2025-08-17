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
      PRODUCT.belongsToMany(models.Cart, { through: 'cartItems' });

    }
  }
  PRODUCT.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // auto-generate UUID v4
        primaryKey: true,
        allowNull: false,
      },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product', 
  });
  
  return PRODUCT;
};