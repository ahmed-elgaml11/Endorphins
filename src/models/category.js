import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CATEGORY extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CATEGORY.hasMany(models.Product)
    }
  }
  CATEGORY.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return CATEGORY;
};