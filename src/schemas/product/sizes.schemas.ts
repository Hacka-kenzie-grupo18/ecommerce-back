import { z } from "zod";

export const sizesSchemas = z.object({
    uuid: z.string().uuid(),
    size: z.string().max(4)
})