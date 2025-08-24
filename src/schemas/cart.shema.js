import z from "zod";
const uuidString = z.uuid({ version: "v4", message: "Invalid UUID v4 format" });

export const addToCartSchema = z.object({
  body: z.object({
    quantity: z.number().int().default(1).optional()
  }).optional(),
  params: z.object({
    productId: uuidString
  }),
});
