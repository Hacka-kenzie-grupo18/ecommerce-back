import { z } from "zod";

export const userSchema = z.object({
    uuid:     z.string().uuid(),
    name:     z.string().max(255),
    email:    z.string().min(2).max(255).email(),
    password: z.string().min(6),
    phone:    z.string().max(15).nullable(),
    cpf:      z.string().max(11),
    cep:      z.string().max(9),
    state:    z.string().max(4),
    city:     z.string().max(50),
    street:   z.string().max(255),
    number:   z.string().max(100),
    isAdm:    z.boolean().default(false),
    resetPasswordToken: z.string().nullable(),
    passwordTokenExpiresIn: z.date().nullable()
})

export const userSchemaRequest  = userSchema.omit({uuid: true, resetPasswordToken: true, passwordTokenExpiresIn: true})

export const userSchemaResponse = userSchema.omit({password: true})

export const userSchemaUpdate   = userSchemaResponse.partial()

export const userSchemaEmailResetPassword = z.object({
    email: z.string().email()
})

export const userSchemaPasswordReset = z.object({
    password: z.string().min(6)
})