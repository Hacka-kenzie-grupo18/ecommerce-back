import prisma from "../../database/prisma";
import { commentsRequest } from "../../interfaces/comments.interface";

export const createCommentService = async (
    productUUID: string,
    userUUID: string,
    dataRequest: commentsRequest
    ) => {

        const newComment = await prisma.comments.create({
            data: {
                product_uuid: productUUID,
                user_uuid: userUUID,
                ...dataRequest
            },
            include: {
                product: true
            }
        })

        return newComment

    }