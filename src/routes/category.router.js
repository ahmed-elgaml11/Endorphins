import express from "express";
const router = express.Router();
import * as categoryControllers from '../controllers/category.controllers.js'
import { validateRequest } from "../midllewares/validateRequest.js";
import {addCategorySchema, getCategorySchema, updateCategorySchema } from '../schemas/category.schema.js'





router.route('/')
    .get(categoryControllers.getAllCategories)
    .post(validateRequest(addCategorySchema), categoryControllers.createCategory)


router.route('/:id')
    .get(validateRequest(getCategorySchema), categoryControllers.getCategory)
    .patch(validateRequest(updateCategorySchema), categoryControllers.updateCategory)
    .delete(validateRequest(getCategorySchema), categoryControllers.deleteCategory)
    


export default router