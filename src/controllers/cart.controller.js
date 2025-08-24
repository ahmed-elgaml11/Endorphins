import { upsertCart, upsertCartItem } from "../services/cart.service.js";
import { upsertUser } from "../services/user.services.js";
import { catchAsync } from "../utils/catchAsync.js";


export const addToCart = catchAsync(async (req, res) => {
  const quantity = req.body?.quantity ? parseInt(req.body.quantity) : 1;
  const { productId } = req.params
  
  
  const [user, _] = await upsertUser(req.sessionID)

  const [cart, __] = await upsertCart(user.id)

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
