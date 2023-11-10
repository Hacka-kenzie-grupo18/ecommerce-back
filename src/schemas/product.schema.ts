import { z } from "zod";

enum ClothingSize {
    P = 'P',
    M = 'M',
    G = 'G',
    GG = 'GG',
    XG = 'XG',
  }

export const productSchema = z.object({
  uuid: z.string().uuid(),
  title: z.string(),
  image: z.string().max(255).nullish(),
  description: z.string(),
  price: z.number(),
  size: z.nativeEnum(ClothingSize),
  color: z.string().max(50),
  theme: z.string(),
  user_author: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullish(),
});

export const productSchemaRequest = productSchema.omit({
  uuid: true,
  author: true,
  user_author: true,
  image: true,
  createdAt: true,
  updatedAt: true,
});

export const productSchemaRequestUpdate = productSchemaRequest.deepPartial();

export const productSchemaArray = productSchema.array();