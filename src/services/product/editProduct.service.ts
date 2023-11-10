import prisma from "../../database/prisma";
import { products, productsRequestUpdate } from "../../interfaces/product.interfaces";
import { productSchema } from "../../schemas/product.schema";

export const editProductService = async (
    data: productsRequestUpdate,
    productUUID: string
  ): Promise<products> => {
    const editProduct: products = await prisma.product.update({
      where: { uuid: productUUID },
      data: { ...data },
      include: { user_author: true },
    });
  
    return productSchema.parse(editProduct);
  };