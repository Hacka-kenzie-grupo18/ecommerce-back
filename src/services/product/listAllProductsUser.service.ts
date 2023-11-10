import prisma from "../../database/prisma";
import { productResponseArrayPaginated, productsResponseArray } from "../../interfaces/product.interfaces";
import { handlePaginationListAllUserProducts } from "../utils/pagination/handlePaginationListAllUserProducts";


export const listAllProductsUserService = async (
    limit: any,
    offset: any,
    userUUID: string
  ): Promise<productResponseArrayPaginated> => {
    limit = Number(limit);
    if (!limit) {
      limit = 5;
    }
  
    offset = Number(offset);
    if (!offset) {
      offset = 0;
    }
  
    const userProducts: productsResponseArray | null = await prisma.product.findMany({
      where: { user_author: userUUID },
      skip: offset,
      take: limit,
    });
  
    const { nextUrl, previousUrl, totalProducts } =
      await handlePaginationListAllUserProducts(limit, offset, userUUID);
  
    return {
      nextUrl,
      previousUrl,
      Total: totalProducts,
      limit,
      offset,
      products: userProducts,
    };
  };