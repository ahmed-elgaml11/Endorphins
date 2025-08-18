import db from "../models/index.js"
const { Cart } = db

export const upsertCart = async (userId) => {
  return await Cart.findOrCreate({
    where: { userId, status: "active" },
  });
}
export const upsertCartItem = async (cartId, productId, quantity ) => {
  return await CartItem.findOrCreate({
    where: { cartId, productId },
    defaults: {
      quantity: quantity || 1,
    },
  });
}
