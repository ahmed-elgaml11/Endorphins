import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class ORDER extends Model {
        static associate(models) {
            ORDER.belongsTo(models.User)
        }

    }
    ORDER.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            price: DataTypes.STRING
        },
        { sequelize, modelName: "Order" }
    );

    return ORDER
}
