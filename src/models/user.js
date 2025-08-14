import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class USER extends Model {
        static associate(models) {
            USER.hasMany(models.Order)
        }

    }
    USER.init(
        {
            name: DataTypes.STRING,
            phone: DataTypes.STRING,
            address: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return USER
};
