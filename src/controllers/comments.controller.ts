import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";

export const createCommentsController = async(
    req:Request,
    res:Response
): Promise <Response> => {
    const productUUID = req.params.uuid
    const userUUID    = res.locals.userUUID
    const request     = req.body

    const comment = await createCommentService(
        productUUID,
        userUUID,
        request
    )

    return res.status(201).json(comment)
}


export const deleteCommentController = async(
    req:Request,
    res:Response
): Promise <Response> => { 

    const commentUUID = req.params.uuid
    
    await deleteCommentService(commentUUID)

    return res.status(204).json()

}