import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";
import { user } from "../interfaces/user.interfaces";

export const ensureIsAdminUser = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

    const userUUID: string = res.locals.userUUI;

    const dbUser: user | undefined | null = await prisma.user.findFirst({ where: { uuid: userUUID } });

    if (!dbUser!.isAdm) {
        throw new AppError('Unauthorized access. You are not an administrator.', 403);
    }

    next();
   
    
}