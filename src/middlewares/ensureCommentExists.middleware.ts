import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureCommentExistsMiddleware = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    
    const commentExists = await prisma.comments.findFirst({
        where: {
                uuid: req.params.uuid
        }
    })

    if(!commentExists){
        throw new AppError("Comment not found", 404)
    }

    return next()
}