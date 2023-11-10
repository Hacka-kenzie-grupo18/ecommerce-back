import { NextFunction, Request, Response } from "express";
import prisma from "../database/prisma";
import AppError from "../errors/app.errors";

export const ensureIsAdminUser = async(req: Request, res: Response, next: NextFunction):Promise<void> => {

    const userId: number = Number(res.locals.userId);

    const dbUser = await prisma.user.findFirst({ where: { id: userId } });

    if (!dbUser.isAdm) {
        throw new AppError('Unauthorized access. You are not an administrator.', 403);
    }

    next();
   
    
}