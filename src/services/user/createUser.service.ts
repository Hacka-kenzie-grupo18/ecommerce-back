import prisma from "../../database/prisma"
import { user, userRequest, userResponse } from "../../interfaces/user.interfaces"
import { userSchemaResponse } from "../../schemas/user.schema"
import bcrypt from 'bcryptjs'
import * as crypto from "crypto"
import { sendCodeToNewUser } from "../../utils/emailTemplates/sendCodeToNewUser"
import { sendEmail } from "../../utils/email/sendEmail"

export const createUserService = async(data: userRequest):Promise<userResponse> =>{
    const { password, ...rest} = data

    const hashPassword = await bcrypt.hash(password, 10)
    
    const newUser: user = await prisma.user.create({data: {...rest, password: hashPassword}})

    const newCodeUser: string = crypto.randomBytes(4).toString('hex').toUpperCase()

    await prisma.user.update({
        where:{
            uuid: newUser.uuid
        },
        data: {
            code: newCodeUser
        }
    })

    const sendCodeEmailTemplate = sendCodeToNewUser(newUser.email, newUser.name, newCodeUser)

    await sendEmail(sendCodeEmailTemplate)

    return userSchemaResponse.parse(newUser)
    
}