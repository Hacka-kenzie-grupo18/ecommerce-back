import { z } from "zod";
import { colorsSchema } from "../schemas/product/colors.schema";

export type color = z.infer<typeof colorsSchema>