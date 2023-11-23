import prisma from "../../database/prisma";
import { commentsRequestUpdate } from "../../interfaces/comments.interface";


export const updateCommentService = async(
    comment: string, 
    user: string, 
    request:commentsRequestUpdate
    ) => {
    const newComment = await prisma.comments.update({
        where: {
            uuid: comment
        },
        data: {...request},
        include: {
            user: true,
            product: true
        }
    })


    return newComment
}