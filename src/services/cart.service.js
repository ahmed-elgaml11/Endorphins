import db from "../models/index.js"
const { Cart, CartItem } = db

export const upsertCart = async (UserId) => {
  return await Cart.findOrCreate({
    where: { UserId, status: "active" },
  });
}
export const upsertCartItem = async (CartId, productId, quantity) => {
  return await CartItem.findOrCreate({
    where: { CartId, ProductId: productId },
    defaults: {
      quantity: quantity 
    },
  });
}


export const createNewCart = async (UserId) => {
  await Cart.create({
    UserId,
    status: 'active'
  })
}