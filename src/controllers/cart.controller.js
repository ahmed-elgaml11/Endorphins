import { upsertCart, upsertCartItem } from "../services/cart.service.js";
import { catchAsync } from "../utils/catchAsync.js";


export const addToCart = catchAsync(async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params
  const [cart, isCreated] = await upsertCart(req.user.id)
  
  const [cartItem, created] = await upsertCartItem(cart.id, productId, quantity)

  if (!created) {
    cartItem.quantity += quantity || 1;
    cartItem.save()
  }
  res.status(201).json({
    status: "success",
    data: {
      cartItem
    },
  });
});
