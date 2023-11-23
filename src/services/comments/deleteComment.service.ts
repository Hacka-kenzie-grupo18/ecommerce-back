import prisma from "../../database/prisma"

export const deleteCommentService = async (commentUUID: string) => {
    
    console.log(commentUUID)
    
    
    await prisma.comments.delete({
        where: {
            uuid: commentUUID
        }
    })

    return
}