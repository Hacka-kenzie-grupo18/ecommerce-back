import { z } from "zod";

export const colorsSchema = z.object({
    uuid: z.string().uuid(),
    color: z.string().max(155)
})