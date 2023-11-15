import { z } from "zod";
import { userSchemaResponse } from "../user.schema";

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
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const productSchemaRequest = productSchema.omit({
  uuid: true,
  user_author: true,
  createdAt: true,
  updatedAt: true,
  rating: true
});

export const productSchemaResponse = productSchema.omit({
  category: true
})

export const productSchemaRequestUpdate = productSchemaRequest.partial();

export const productSchemaArray = productSchema.array();