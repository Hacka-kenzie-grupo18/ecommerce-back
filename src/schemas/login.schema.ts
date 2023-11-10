import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email().min(2).max(255),
    password: z.string().min(1)
})