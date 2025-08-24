import db from "../models/index.js";
import order from "../models/order.js";
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


export const createOrder = (description, totalPrice, CartId, UserId) => {
  return Order.create({
    price: totalPrice,
    CartId,
    UserId,
    description
  });
}


export const cleanOrder = (order) => {
  const cleanOrder = order.get({ plain: true });
  delete cleanOrder.createdAt;
  delete cleanOrder.updatedAt;
  return cleanOrder
}


export const deleteUserCart = async (cart, cartItems) => {
  if (cart) {
    await cart.destroy({ force: true });
  }

  if (cartItems && cartItems.length > 0) {
    for (const item of cartItems) {
      await item.destroy({ force: true });
    }
  }
};
