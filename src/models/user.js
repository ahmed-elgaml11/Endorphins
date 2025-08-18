import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Order)
            User.hasOne(models.Cart)
        }

    }
    User.init(
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
    return User
};
