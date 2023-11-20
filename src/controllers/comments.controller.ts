import { Request, Response } from "express";
import { createCommentService } from "../services/comments/createComment.service";

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