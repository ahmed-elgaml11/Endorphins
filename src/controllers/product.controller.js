import {catchAsync} from "../utils/catchAsync.js";
import * as Services from "../services/product.service.js";
import { AppError } from "../utils/appError.js";
import { getCategoryByName } from "../services/category.service.js";

export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Services.getAll();

    res.status(200).json({
        status: "success",
        data: {
            products
        },
    });
});
export const createProduct = catchAsync(async (req, res, next) => {
    const { name, price, description, categoryName } = req.body;
    const category = await getCategoryByName(categoryName)

    const product = await Services.createOne({
        name,
        price,
        description,
        CategoryId: category.id
    });

    res.status(201).json({
        status: "success",
        data: {
            product
        },
    });
});
export const getProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const product = await Services.getOne(id);
    if (!product) {
        next(new AppError("this product is not exist", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            product
        },
    });
});
export const updateProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const product = await Services.updateOne(id, body);
    if (!product) {
        next(new AppError("this product is not exist", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            product
        },
    });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const product = await Services.deleteOne(id);
    if (!product) {
        next(new AppError("this product is not exist", 404));
    }

    res.status(204).json({
        status: "success",
        data: {},
    });
});
