import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";
import { deleteCommentService } from "../services/comments/deleteComment.service";
import { listAllCommentsService } from "../services/comments/listAllComments.service";
import { updateCommentService } from "../services/comments/updateComment.service";

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


export const listAllCommentsController = async (
    req:Request,
    res:Response
):Promise<Response> => {
    
    const allComments = await listAllCommentsService()

    return res.status(200).json(allComments)
}

export const updateCommentController = async (
    req:Request,
    res:Response
):Promise<Response> => {
    const commentUUID = req.params.uuid
    const userUUID    = res.locals.userUUID
    const requestBody = req.body

    const newComment = await updateCommentService(commentUUID, userUUID, requestBody)

    return res.status(200).json(newComment)
}