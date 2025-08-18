import express from "express";
const router = express.Router();
import { makeOrder } from "../controllers/order.controller.js";
import { isAuth } from "../midllewares/auth.js";





router.post('/checkout', isAuth, makeOrder)
    


export default router