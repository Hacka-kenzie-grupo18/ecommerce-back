import prisma from "../../../database/prisma";

export const handlePaginationListAllProducts = async (
  limit: number,
  offset: number
) => {
  const total: number = await prisma.posts.count();

  const nextPage = limit + offset;
  const nextUrl =
    nextPage < total ? `/posts?offset=${nextPage}&limit=${limit}` : null;

  const previousPage = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previousPage != null
      ? `/posts?offset=${previousPage}&limit=${limit}`
      : null;

  return { nextUrl, previousUrl, total };
};