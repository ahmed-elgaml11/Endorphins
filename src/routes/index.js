import express from "express";
const router = express.Router();
import productRoutes from './product.router.js'
import categoryRoutes from './category.router.js'
import orderRoutes from './order.router.js'
import cartRoutes from './cart.router.js'
import userRoutes from './user.router.js'


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from api.'
    })
})


router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)
router.use('/orders', orderRoutes)
router.use('/carts', cartRoutes)
router.use('/users', userRoutes)

export default router