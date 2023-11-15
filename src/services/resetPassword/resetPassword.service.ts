import bcrypt from 'bcryptjs'
import prisma from '../../database/prisma'
import { user } from '../../interfaces/user.interfaces'
import { sendEmailResetPasswordSucess } from '../../utils/emailTemplates/confirmResetEmail'
import { sendEmail } from '../../utils/email/sendEmail'

export const resetPasswordService = async (password: string, resetPasswordToken: string):Promise<void> => {
    const hashPassword = await bcrypt.hash(password, 10)

    try {
        
        const user: user | null | undefined = await prisma.user.findFirst({where: {resetPasswordToken}})
    
        await prisma.user.update({where: {uuid: user!.uuid}, data:{resetPasswordToken: null, password:hashPassword}})

        const confirmEmailResetPasswordTemplate = sendEmailResetPasswordSucess(user!.email, user!.name)

        await sendEmail(confirmEmailResetPasswordTemplate)
    
        return
    } catch (error) {
        console.log(error)
    }
}   