import cartItem from "../models/cartItem.js";
import { AppError } from "../utils/appError.js";
import db from "../models/index.js";
import { catchAsync } from "../utils/catchAsync.js";
const { Cart, Order } = db;


export const makeOrder = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({
    where: {
      userId: req.user.id,
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

  if (!cart) return next(new AppError(404, "No active cart found"));

  const totalPrice = cart.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.Product.price,
    0
  );
  let description;
  cart.cartItem.forEach((item) => {
    description += `${item.Product.name}: ${item.Product.price}\n`;
  });

  const order = await Order.create({
    price: totalPrice,
    cartId: cart.id,
    description,
    userId: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      message: "Checkout successful",
      order,
    },
  });
});
