import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureProductIsInCartMiddleware = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const productUUUID = req.params.uuid
    const userUUID     = res.locals.userUUID

    const product = await prisma.cart.findFirst({
        where: {
            product_uuid: productUUUID,
            user_uuid: userUUID
        }
    })

    if(!product){
        throw new AppError("Product not found", 404)
    }

    return next()
}