import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureUserIsCommentOwnerMiddleware = async (req:Request, res: Response, next: NextFunction):Promise<void> => {
    const isOwner = await prisma.comments.findFirst({
        where: {
                uuid: req.params.uuid,
                user_uuid: res.locals.userUUID
        }
    })

    if(!isOwner){
        throw new AppError("you are not allowed to delete that comment", 403)
    }

    return next()
}