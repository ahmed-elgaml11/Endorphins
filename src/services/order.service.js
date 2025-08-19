import db from "../models/index.js";
const { Cart, Product, Order } = db
export const getUserCart = (UserId) => {
  return  Cart.findOne({
    where: { UserId, status: 'active' },
    include: [
      {
        model: Product,
        attributes: ['id', 'name', 'price'],
        through: { attributes: ['quantity'] }, 
      },
    ],
  });

}


export const createOrder = (totalPrice, CartId, description, UserId) => {
  return Order.create({
    price: totalPrice,
    CartId,
    UserId,
    description
  });
}