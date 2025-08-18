import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { createOrder } from "../services/order.service.js";


export const makeOrder = catchAsync(async (req, res, next) => {
  const cart = await getUserCart(req.user.id)

  if (!cart) return next(new AppError(404, "No active cart found"));

  const totalPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.Product.price,
    0
  );

  const description = cart.cartItems.Product.map(
    (product) => `${product.name}: ${product.price}`
  ).join("\n");

  const order = await createOrder(totalPrice, cart.id, description, req.user.id)

  res.status(201).json({
    status: "success",
    data: {
      message: "Checkout successful",
      order,
    },
  });
});
