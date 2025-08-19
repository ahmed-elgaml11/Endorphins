import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsTo(models.User);
            Order.belongsTo(models.Cart);
        }
    }
    Order.init(
        {
            description: DataTypes.STRING,
            price: {
                type: DataTypes.DECIMAL(10, 2), // better for money than STRING
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: "pending",
            },
        },
        { sequelize, modelName: "Order" }
    );

    return Order;
};
