import z from "zod";
const uuidString = z.uuid({ version: "v4", message: "Invalid UUID v4 format" });

export const addToCartSchema = z.object({
  body: z.object({
    quantity: z.number().int().min(1, "Quantity must be at least 1").default(1).optional()
  }),
  params: z.object({
    productId: uuidString
  }),
});
