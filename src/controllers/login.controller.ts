import { Request, Response } from "express";
import { login } from "../interfaces/login.interfaces";
import { createTokenService } from "../services/login/createToken.service";

export const loginController = async(req:Request, res:Response)=> {
    const data: login = req.body
    const token:string = await createTokenService(data)

    return res.status(200).json({token: token})
}