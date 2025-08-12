import express from "express";
const router = express.Router();
import productRoutes from './product.router.js'
import categoryRoutes from './category.router.js'


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from api.'
    })
})


router.use('/products', productRoutes)
router.use('/categories', categoryRoutes)

export default router