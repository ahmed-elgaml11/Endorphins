import express from "express";
const router = express.Router();
import { validateRequest } from "../midllewares/validateRequest.js";
import { addToCart } from "../controllers/cart.controller.js";
import { addToCartSchema } from "../schemas/cart.shema.js";





router.post('/add/:productId', validateRequest(addToCartSchema), addToCart)
    


export default router