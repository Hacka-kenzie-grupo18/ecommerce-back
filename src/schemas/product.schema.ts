import { z } from "zod";
import { userSchemaResponse } from "./user.schema";

// enum clothingSize {
//   P = 'P',
//   M = 'M',
//   G = 'G',
//   GG = 'GG',
//   XG = 'XG',
// }

const clothingSizeArray = ['P', 'M', 'G', 'GG', 'XG'] as const

export const productSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string(),
  image: z.string().max(255).nullish(),
  description: z.string(),
  price: z.number(),
  size: z.enum(clothingSizeArray),
  color: z.string().max(50),
  theme: z.string(),
  category: z.string(),
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