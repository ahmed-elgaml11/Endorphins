import express from "express";
const router = express.Router();
import * as productControllers from '../controllers/product.controllers.js'
import { validateRequest } from "../midllewares/validateRequest.js";
import {addProductSchema, getProductSchema, updateProductSchema } from '../schemas/product.schema.js'



router.route('/')
    .get(productControllers.getAllProducts)
    .post(validateRequest(addProductSchema), productControllers.createProduct)


router.route('/:id')
    .get(validateRequest(getProductSchema), productControllers.getProduct)
    .patch(validateRequest(updateProductSchema), productControllers.updateProduct)
    .delete(validateRequest(getProductSchema), productControllers.deleteProduct)
    


export default router