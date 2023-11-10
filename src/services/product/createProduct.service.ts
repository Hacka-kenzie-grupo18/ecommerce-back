import prisma from "../../database/prisma";
import { products, productsRequest } from "../../interfaces/product.interfaces";
import { productSchema } from "../../schemas/product.schema";

export const createProductService = async (
  userUUID: string,
  data: productsRequest
): Promise<products> => {
  const newProduct = await prisma.product.create({
    data: { ...data, user_author: userUUID },
  });

  return productSchema.parse(newProduct);
};
