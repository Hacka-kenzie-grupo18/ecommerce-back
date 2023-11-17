import prisma from "../../database/prisma"

export const listAllProductsUserService = async ()=> {

    const allProducts = await prisma.product.findMany({
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
            }
        }
    })

    return allProducts

}