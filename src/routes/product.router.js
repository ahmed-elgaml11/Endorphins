import express from "express";
const router = express.Router();
import * as productControllers from '../controllers/product.controller.js'
import { validateRequest } from "../midllewares/validateRequest.js";
import {addProductSchema, getProductSchema, updateProductSchema } from '../schemas/product.schema.js'
import { isAdmin } from "../midllewares/auth.js";



router.route('/')
    .get(productControllers.getAllProducts)
    .post(validateRequest(addProductSchema), isAdmin, productControllers.createProduct)


router.route('/:id')
    .get(validateRequest(getProductSchema), productControllers.getProduct)
    .patch(validateRequest(updateProductSchema), isAdmin, productControllers.updateProduct)
    .delete(validateRequest(getProductSchema), isAdmin, productControllers.deleteProduct)
    


export default router