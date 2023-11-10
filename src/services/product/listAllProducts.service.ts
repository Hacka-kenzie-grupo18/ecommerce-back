import prisma from "../../database/prisma";
import { productResponseArrayPaginated, productsResponseArray } from "../../interfaces/product.interfaces";
import { handlePaginationListAllProducts } from "../utils/pagination/handlePaginationListAllPosts";

export const listAllProductsService = async (
    limit: any,
    offset: any
  ): Promise<productResponseArrayPaginated> => {
    limit = Number(limit);
    offset = Number(offset);
    if (!limit) {
      limit = 10;
    }
    if (!offset) {
      offset = 0;
    }
  
    const { nextUrl, previousUrl, total } = await handlePaginationListAllProducts(
      limit,
      offset
    );
  
    const products: productsResponseArray = await prisma.product.findMany({
      include: { author: true },
      skip: offset,
      take: limit,
    });
  
    return {
      nextUrl,
      previousUrl,
      Total: total,
      offset,
      limit,
      products: products,
    };
  };