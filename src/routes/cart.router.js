import express from "express";
const router = express.Router();
import * as cartControllers from '../controllers/cart.controllers.js'
import { validateRequest } from "../midllewares/validateRequest.js";





router.route('/add', cartControllers.addToCart)
    


export default router