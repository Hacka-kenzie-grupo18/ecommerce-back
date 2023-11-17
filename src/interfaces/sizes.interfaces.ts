import { z } from "zod";
import { sizesSchemas } from "../schemas/product/sizes.schemas";

export type sizes = z.infer<typeof sizesSchemas>