import prisma from "../../database/prisma"

export const addProductToCartService = async(
    userUUID: string, 
    productUUID: string,
    quantityProduct: number 
    ) => {


        const addProduct = await prisma.cart.create({
            data: {
                quantity: quantityProduct,
                user_uuid: userUUID,
                product_uuid: productUUID
            },
            include: {
                product: true
            }
        })

        return addProduct

    }