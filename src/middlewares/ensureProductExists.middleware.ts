import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureProductExistsMiddleware = async (req:Request, res:Response, next: NextFunction):Promise<void> => {
    const productExists = await prisma.product.findFirst({
        where: {
            uuid: req.params.uuid.toString()
        }
    })

    if(!productExists){
        throw new AppError("Product not found", 404)
        
    }

    return next()
}