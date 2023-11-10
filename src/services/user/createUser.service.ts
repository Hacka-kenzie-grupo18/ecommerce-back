import prisma from "../../database/prisma"
import { user, userRequest, userResponse } from "../../interfaces/user.interfaces"
import { userSchemaResponse } from "../../schemas/user.schema"
import bcrypt from 'bcryptjs'

export const createUserService = async(data: userRequest):Promise<userResponse> =>{
    const { password, ...rest} = data

    const hashPassword = await bcrypt.hash(password, 10)
    
    const newUser: user = await prisma.user.create({data: {...rest, password: hashPassword}})

    return userSchemaResponse.parse(newUser)
    
}