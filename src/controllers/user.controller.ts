import { Request, Response } from "express";
import { userRequest, userResponse } from "../interfaces/user.interfaces";
import { createUserService } from "../services/user/createUser.service";

export const createUserController = async (req:Request, res:Response):Promise<Response> => {
    
    const userRequest: userRequest = req.body
    const newUser: userResponse = await createUserService(userRequest)

    return res.status(200).json(newUser)
}