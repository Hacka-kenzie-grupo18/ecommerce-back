import { z } from "zod";
import { userSchemaResponse } from "./user.schema";
import { productSchemaResponse } from "./product/product.schema";

export const cartSchema = z.object({
    uuid: z.string().uuid(),
    quantity: z.number(),
    user: userSchemaResponse,
    product: productSchemaResponse
})

export const cartSchemaRequest = cartSchema.omit({
    uuid: true,
    user: true,
    product: true
})