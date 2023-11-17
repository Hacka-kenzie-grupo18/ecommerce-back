import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureAdmIsOwnerProductMiddleware = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const product = await prisma.product.findFirst({
        where: {
            uuid: req.params.uuid.toString()
        }
    })

    if(product?.user_author !== res.locals.userUUID){
        throw new AppError("Unauthorized request, you're not the product owner.", 403)
    }

    return next()
}