import prisma from "../../database/prisma"

export const listUniqueProductService = async (productUUID: string)=> {
    const product = await prisma.product.findFirst({
        where: {
            uuid: productUUID
        },
        include: {
            product_categories: {
                include: {
                    categories: true
                }
            },
            product_colors: {
                include: {
                    color: true
                }
            },
            product_images: true,
            product_sizes: {
                include: {
                    size: true
                }
            },
            product_themes: {
                include: {
                    theme: true
                }
            },
            user: true
        }
    })

    return product
}