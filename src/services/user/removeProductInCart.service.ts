import prisma from "../../database/prisma"

export const removeProductInCartService = async (user: string, product: string) => {
    const productCart = await prisma.cart.findFirst({
      where: {
        product_uuid: product,
        user_uuid: user,
      },
    });

    await prisma.cart.delete({
        where: {
            uuid: productCart!.uuid
        }
    })
  
    return;
  };