import { z } from "zod";

export const imagesSchema = z.object({
    uuid : z.string().uuid(),
    images_urls : z.string()
})

