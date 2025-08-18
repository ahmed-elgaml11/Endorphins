import express from "express";
const router = express.Router();
import { validateRequest } from "../midllewares/validateRequest.js";
import { addToCart } from "../controllers/cart.controller.js";
import { addToCartSchema } from "../schemas/cart.shema.js";
import { isAuth } from "../midllewares/auth.js";





router.post('/add/:productId', isAuth, validateRequest(addToCartSchema), addToCart)
    


export default router