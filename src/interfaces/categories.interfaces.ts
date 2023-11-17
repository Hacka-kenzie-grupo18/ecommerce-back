import { z } from "zod";
import { categoriesSchema } from "../schemas/product/categories.schemas";

export type categories = z.infer<typeof categoriesSchema> 