import prisma from "../../database/prisma";

export const deleteProductService = async (productUUID: string):Promise<void> => {
    await prisma.product.delete({
        where:{
            uuid: productUUID
        }
    })

    return
}