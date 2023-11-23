import prisma from "../../database/prisma"

export const listAllCommentsService = async () => {

    const allComments = await prisma.comments.findMany({
        include: {
            user: true,
            product: true
        }
    })

    return allComments
}