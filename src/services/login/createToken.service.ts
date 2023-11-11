import prisma from "../../database/prisma";
import AppError from "../../errors/app.errors";
import { login } from "../../interfaces/login.interfaces";
import { user } from "../../interfaces/user.interfaces";
import bcrypt from 'bcryptjs'
import "dotenv"
import jwt from "jsonwebtoken"

export const createTokenService = async (data:login):Promise<string>=> {
    const {email, password} = data

    const possibleUser: user | undefined | null = await prisma.user.findFirst({where: {email: email}})
    
    if(!possibleUser){
        throw new AppError("Email or password doesn't match", 401)
    }

    const isCorrectPassword = await bcrypt.compare(password, possibleUser.password)


    if(!isCorrectPassword){
        throw new AppError("Email or password doesn't match", 401)
    }

    const token = jwt.sign(
        {email: possibleUser.email}, 
        process.env.SECRET_KEY!, 
        {expiresIn: process.env.EXPIRES_IN, subject: possibleUser.uuid.toString()})

    return token
}