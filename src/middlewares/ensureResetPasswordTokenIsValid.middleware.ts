import { NextFunction, Request, Response } from "express";
import { user } from "../interfaces/user.interfaces";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureResetPasswordTokenIsValidMiddleware = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const {token} = req.params

    const user: user | null | undefined = await prisma.user.findFirst({where: {resetPasswordToken: token}})

    if(!user){
        throw new AppError("User not found", 404)
    }

    const today = new Date()

    if(today > user.passwordTokenExpiresIn!){
        throw new AppError("token expired, try again", 401)
    }

    next()
}