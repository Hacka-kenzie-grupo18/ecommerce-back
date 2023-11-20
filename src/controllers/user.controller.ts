import { Request, Response } from "express";
import { sendEmailResetPasswordService } from "../services/resetPassword/sendEmailResetPassword.service";
import { userRequest, userResponse } from "../interfaces/user.interfaces";
import { createUserService } from "../services/user/createUser.service";
import { resetPasswordService } from "../services/resetPassword/resetPassword.service";
import { listUserInfosService } from "../services/user/listUserInfos.service";
import { addProductToCartService } from "../services/user/addProductToCart.service";
import { removeProductInCartService } from "../services/user/removeProductInCart.service";

export const createUserController = async (
        req:Request, 
        res:Response
    ):Promise<Response> => {
    
    const userRequest: userRequest = req.body
    const newUser: userResponse = await createUserService(userRequest)

    return res.status(200).json(newUser)
}


export const sendEmailResetPasswordController = async (
        req:Request, 
        res:Response
    ):Promise<Response> => {
    const { email} = req.body

    await sendEmailResetPasswordService(email)

    return res.status(200).json({"message": "Token send"})
}


export const resetPasswordController = async (
        req:Request, 
        res: Response
    ):Promise<Response>=> {
    const {password} = req.body
    const { token} = req.params

    await resetPasswordService(password, token)

    return res.status(200).json({"message": "Password changed"})
}

export const listUserInfosController = async (
        req:Request, 
        res:Response
    ): Promise<Response> => {
    const user = await listUserInfosService(res.locals.userUUID)

    return res.status(200).json(user)
  }


  export const validatedUserCodeController = (
        req: Request, 
        res: Response
    ):Response => {
  
    return res.status(200).json({ 
      "message": "Valid Token"
    })
  }


  export const addProductToCartController = async(
        req: Request,
        res: Response
  ): Promise<Response> => {
    const productUUID = req.params.uuid
    const userUUID    = res.locals.userUUID
    const quantity    = req.body.quantity

 

    const addProduct = await addProductToCartService(userUUID, productUUID, quantity)

    return res.status(201).json(addProduct)
  }


  export const removeProductInCartController = async (
        req:Request,
        res: Response
  ):Promise<Response> => {
    const productUUID = req.params.userUUID
    const user = res.locals.userUUID

    await removeProductInCartService(user, productUUID)

    return res.status(204).json()
  }