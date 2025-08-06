import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/appError';

export const validateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
        });

        if (!result.success) {
            const messages = result.error.errors
                .map((err) => {
                    return `${err.path.slice(-1)[0]}: ${err.message}`
                })
                .join(',  ');
            throw new AppError(`Validation Error: ${messages || 'Validation Failed'}`, 400);
        }
    })

    next();
};
