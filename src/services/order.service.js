import db from "../models/index.js";
const {Cart, cartItem, Product, Order} = db
export const getUserCart = (userId) => {
  return Cart.findOne({
    where: {
      userId,
      status: "active",
    },
    include: [
      {
        model: cartItem,
        attributes: ["quantity"],
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price"],
          },
        ],
      },
    ],
  });
}


export const createOrder = (totalPrice, cartId, description, userId) => {
  return Order.create({
    price: totalPrice,
    cartId,
    description,
  });
}