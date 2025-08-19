import {catchAsync} from "../utils/catchAsync.js";
import * as Services from "../services/category.service.js";
import { AppError } from "../utils/appError.js";

export const getAllCategories = catchAsync(async (req, res, next) => {
    const categories = await Services.getAll();

    res.status(200).json({
        status: "success",
        data: {
            categories
        },
    });
});
export const createCategory = catchAsync(async (req, res, next) => {
    const category = await Services.createOne(req.body);

    res.status(201).json({
        status: "success",
        data: {
            category
        },
    });
});
export const getCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const category = await Services.getOne(id);
    if (!category) {
        next(new AppError("this category is not exist", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            category
        },
    });
});
export const updateCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const category = await Services.updateOne(id, body);
    if (!category) {
        next(new AppError("this category is not exist", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            category
        },
    });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
    const id = req.params.id;

    const category = await Services.deleteOne(id);
    if (!category) {
        next(new AppError("this category is not exist", 404));
    }

    res.status(204).json({
        status: "success",
        data: {},
    });
});


