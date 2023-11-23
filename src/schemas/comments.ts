import { z } from "zod";
import { productSchema } from "./product/product.schema";
import { userSchema } from "./user.schema";

export const commentsSchema = z.object({
    uuid: z.string().uuid(),
    comment: z.string(),
    rating: z.number().nullish(),
    created_at: z.date(),
    updated_at: z.date().nullish(),
    product: productSchema,
    user: userSchema
})


export const commentsRequestSchema = commentsSchema.omit({
    uuid: true, 
    user: true,
    product: true,
    created_at: true,
    updated_at: true
})


export const commentsRequestUpdate = commentsRequestSchema.partial()