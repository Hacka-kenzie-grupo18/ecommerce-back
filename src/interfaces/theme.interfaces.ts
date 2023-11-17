import { z } from "zod"
import { themeSchema } from "../schemas/product/theme.schema"

export type theme = z.infer<typeof themeSchema> 