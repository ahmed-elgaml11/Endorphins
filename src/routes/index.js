import express from "express";
const router = express.Router();
import orderRoutes from './order.router.js'
import cartRoutes from './cart.router.js'


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from api.'
    })
})


router.use('/orders', orderRoutes)
router.use('/carts', cartRoutes)

export default router