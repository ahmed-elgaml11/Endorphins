import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User);
            Order.belongsTo(models.Cart, {
                foreignKey: {
                    name: "CartId",
                    allowNull: true,   
                },
            });
        }
    }
    Order.init(
        {
            description: DataTypes.STRING,
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            },
        },
        {
            sequelize,
            modelName: "Order",
            defaultScope: {
                attributes: { exclude: ["createdAt", "updatedAt"] },
            },

        }
    );

    return Order;
};
