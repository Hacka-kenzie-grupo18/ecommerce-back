import { z } from "zod"
import { imagesSchema } from "../schemas/product/images.schemas"

export type imagesProduct = z.infer<typeof imagesSchema>