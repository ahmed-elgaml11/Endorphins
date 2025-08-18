import db from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.js";
const { Cart, CartItem } = db;


export const addToCart = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params
  const cart = await Cart.findOrCreate({
    where: { userId: req.user.id, status: "active" },
  });
  const [cartItem, created] = await CartItem.findOrCreate({
    where: { cartId: cart.id, productId },
    defaults: {
      quantity: quantity || 1,
    },
  });
  if (!created) {
    cartItem.quantity += quantity || 1;
  }
  res.status("201").json({
    status: "success",
    data: {
      cartItem
    },
  });
});
