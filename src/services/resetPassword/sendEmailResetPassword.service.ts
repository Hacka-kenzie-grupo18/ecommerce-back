import * as crypto from "crypto"
import prisma from "../../database/prisma"
import { sendEmailResetPasswordTemplate } from "../../utils/emailTemplates/sendEmailResetPasswordTemplate.utils"
import { user } from "../../interfaces/user.interfaces"
import AppError from "../../errors/app.errors"
import { sendEmail } from "../../utils/email/sendEmail"

export const sendEmailResetPasswordService = async (email:string) => {

    const user: user | null | undefined = await prisma.user.findFirst({where: {email}})

    if(!user){
        throw new AppError("User not found", 404)
    }


    const tokenToPasswordField = crypto.randomBytes(20).toString('hex')
    
    const tokenVadity = new Date()
    tokenVadity.setHours(tokenVadity.getHours() + 1)
    
    const userWithTokenPassword: user = await prisma.user.update({
        where: {email: email}, 
        data: {passwordTokenExpiresIn: tokenVadity, 
               resetPasswordToken:tokenToPasswordField}
        })

    
    const resetPasswordTemplate = sendEmailResetPasswordTemplate(
        email, 
        userWithTokenPassword.name, 
        userWithTokenPassword.resetPasswordToken!)

    await sendEmail(resetPasswordTemplate)

    return
}