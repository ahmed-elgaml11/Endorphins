import z from 'zod'

const uuidString = z.uuid({ version: "v4", message: "Invalid UUID v4 format" });


export const productBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().int().nonnegative("Price must be a positive integer"),
    description: z.string().optional()
}).strict()

export const addProductSchema = z.object({
    body: productBodySchema,
    params: z.object({})
}).strict()

export const getProductSchema = z.object({
    body: z.object({}),
    params: z.object({
        id: uuidString
    })
}).strict()


export const updateProductSchema = z.object({
    body: productBodySchema.partial().refine((data) =>
        Object.keys(data).length > 0
        , { message: 'At least one field is required for update' }),
    params: z.object({
        id: uuidString
    })
}).strict()