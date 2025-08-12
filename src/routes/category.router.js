import express from "express";
const router = express.Router();
import * as categoryControllers from '../controllers/category.controllers.js'





router.route('/')
    .get(categoryControllers.getAllCategories)
    .post(categoryControllers.createCategory)


router.route('/:id')
    .get(categoryControllers.getCategory)
    .patch(categoryControllers.updateCategory)
    .delete(categoryControllers.deleteCategory)
    


export default router