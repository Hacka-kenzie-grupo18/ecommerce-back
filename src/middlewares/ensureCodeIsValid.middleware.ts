import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureCodeIsValidMiddleware = async (req: Request, res:Response, next: NextFunction):Promise<void> => {
    const userUUID = res.locals.userUUID
    const codeReq = req.params.code.toString()

    const user = await prisma.user.findFirst({
        where: {
            uuid: userUUID
        }
    }) 

    if(user?.code !== codeReq) {
        throw new AppError("Invalid code",  403)
    }

    next()

}