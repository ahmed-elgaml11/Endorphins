import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class ORDER extends Model {
        static associate(models) {
            ORDER.belongsTo(models.User)
            ORDER.belongsTo(models.Cart)
        }

    }
    ORDER.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.STRING,
            status: {
                type: DataTypes.STRING,
                defaultValue: 'active'
            }
        },
        { sequelize, modelName: "Order" }
    );

    return ORDER
}
