import { NextFunction, Request, Response } from "express";
import { user } from "../interfaces/user.interfaces";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureEmailAndCPFAlreadyExistsMiddleware = async(req: Request, res:Response, next:NextFunction):Promise<void> => {
    const {email, cpf}: {email?: string, cpf?:string} = req.body

    const verify = async (field:string, value: string) => {
        const userReturned: user | undefined | null = await prisma.user.findFirst({where: {[field]: value}})

        if(userReturned){
            throw new AppError(`User with this ${field} already exists`, 401)
        }
    }

    if(email) await verify("email", email)
    if(cpf) await verify("cpf", cpf)

    return next()
}