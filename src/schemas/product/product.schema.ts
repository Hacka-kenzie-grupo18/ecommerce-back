import { z } from "zod";
import { userSchemaResponse } from "../user.schema";
import { themeSchema } from "./theme.schema";
import { imagesSchema } from "./images.schemas";
import { categoriesSchema } from "./categories.schemas";
import { sizesSchemas } from "./sizes.schemas";
import { colorsSchema } from "./colors.schema";

const VALUES = ["Masculino", "Feminino"] as const


export const productSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  price: z.number(),
  sex: z.enum(VALUES),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  theme: z.string(),
  category: z.string(),
  stock: z.number(),
  rating : z.number().nullable(),
  user_author: userSchemaResponse,
  product_themes: z.array(themeSchema),
  product_images: z.array(imagesSchema),
  product_categories: z.array(categoriesSchema),
  product_sizes: z.array(sizesSchemas),
  product_colors: z.array(colorsSchema),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const productSchemaRequest = productSchema.omit({
  uuid: true,
  user_author: true,
  createdAt: true,
  updatedAt: true,
  rating: true,
  product_themes: true,
  product_images: true,
  product_categories: true,
  product_sizes: true,
  product_colors: true
});

export const productSchemaResponse = productSchema.omit({
  category: true,
  theme: true,
  images: true,
  sizes: true,
  colors: true
})

export const productSchemaRequestUpdate = productSchemaRequest.partial();

export const productSchemaArray = productSchema.array();