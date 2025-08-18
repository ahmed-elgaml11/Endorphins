import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    address: z.string().optional(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
  params: z.object({}), 
});

export const loginUserSchema = z.object({
  body: z.object({
    phone: z.string().min(10, "Phone must be at least 10 digits"),
    password: z.string().min(6, "Password is required"),
  }),
  params: z.object({}), 
});
