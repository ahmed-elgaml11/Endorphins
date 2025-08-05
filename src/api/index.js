import express from "express";
const router = express.Router();
import userRoutes from './users/user.routes.js'


router.get('/', (req, res) => {
    res.status(200).json({
        message: 'hello from api.'
    })
})


router.use('/users', userRoutes)

export default router