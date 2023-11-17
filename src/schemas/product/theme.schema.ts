import { z } from "zod";

export const themeSchema = z.object({
    uuid : z.string().uuid(),
    theme: z.string().max(155)
})