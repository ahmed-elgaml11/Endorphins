import z from 'zod'

const uuidString = z.uuid({ version: "v4", message: "Invalid UUID v4 format" });


export const categoryBodySchema = z.object({
    name: z.string().min(1, "Name is required"),
}).strict()

export const addCategorySchema = z.object({
    body: categoryBodySchema,
    params: z.object({})
}).strict()

export const getCategorySchema = z.object({
    body: z.object({}),
    params: z.object({
        id: uuidString
    })
}).strict()


export const updateCategorySchema = z.object({
    body: categoryBodySchema.partial().refine((data) =>
        Object.keys(data).length > 0
        , { message: 'At least one field is required for update' }),
    params: z.object({
        id: uuidString
    })
}).strict()