import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { createOrder, getUserCart, cleanOrder, deleteUserCart } from "../services/order.service.js";

export const makeOrder = catchAsync(async (req, res, next) => {
  const cart = await getUserCart(req.sessionID);
  if (!cart) return next(new AppError("No active cart found", 404));

  const totalPrice = cart.Products.reduce(
    (sum, product) => sum + product.CartItems.dataValues.quantity * product.price,
    0
  );



  const description = cart.Products.map(
    (product) => `${product.name}: ${product.price}, quantity: ${product.CartItems.dataValues.quantity}`
  ).join("\n");


  const order = await createOrder(
    description,
    totalPrice,
    cart.id,
    req.sessionID
  );

  const newOrder = await cleanOrder(order)
  await deleteUserCart(cart, cart.CartItems)



  res.status(201).json({
    status: "success",
    data: {
      message: "Checkout successful",
      newOrder,
    },
  });
});
