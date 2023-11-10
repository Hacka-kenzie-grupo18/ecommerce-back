import prisma from "../../database/prisma";

export const deleteProductService = async (postUUID: string): Promise<void> => {
  const product = await prisma.product.findFirst({ where: { uuid: postUUID } });
  await prisma.product.delete({ where: { uuid: postUUID } });

  return;
};