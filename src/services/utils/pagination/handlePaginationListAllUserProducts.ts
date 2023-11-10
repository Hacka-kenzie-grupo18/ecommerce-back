import prisma from "../../../database/prisma";

export const handlePaginationListAllUserProducts = async (
  limit: any,
  offset: any,
  userUUID: string
) => {
  const totalProducts = await prisma.product.count({
    where: { user_author: userUUID },
  });
  const nextPage = limit + offset;

  const nextUrl =
    nextPage < totalProducts
      ? `/posts/user?offset=${nextPage}&limit=${limit}`
      : null;

  const previous = offset - limit < 0 ? null : offset - limit;

  const previousUrl =
    previous != null ? `/posts/user?offset=${previous}&limit=${limit}` : null;

  return { totalProducts, nextUrl, previousUrl };
};