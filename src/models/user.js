import { Model } from "sequelize";
import bcrypt from 'bcrypt'
export default (sequelize, DataTypes) => {
    class User extends Model {
        validatePassword(password) {
            return bcrypt.compareSync(password, this.password);
        }


        static associate(models) {
            User.hasMany(models.Order)
            User.hasOne(models.Cart)
        }

    }
    User.init(
        {
            name: DataTypes.STRING,
            phone: { type: DataTypes.STRING, unique: true },
            address: DataTypes.STRING,
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            defaultScope: {
                attributes: { exclude: ['password'] }  // hides password everywhere by default
            },
            hooks: {
                beforeCreate: async (user) => {
                    user.password = await bcrypt.hash(user.password, 10);
                },
            }
        }
    );


    return User
};
