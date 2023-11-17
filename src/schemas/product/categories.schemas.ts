import { z } from "zod";

export const categoriesSchema = z.object({
    uuid: z.string().uuid(),
    category: z.string()
})