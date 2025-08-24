import express from "express";
const router = express.Router();
import { makeOrder } from "../controllers/order.controller.js";
import { throttle } from "../midllewares/throttle.js";





router.post('/checkout', throttle, makeOrder)



export default router