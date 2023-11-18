import { Request, Response } from "express";
import { productResponse, productsRequest } from "../interfaces/product.interfaces";
import { createProductService } from "../services/product/createProduct.service";
import { listAllProductsService } from "../services/product/listAllProducts.service";
import { listUniqueProductService } from "../services/product/listUniqueProduct.service";
import { deleteProductService } from "../services/product/deleteProduct.service";
import { listUserInfosService } from "../services/user/listUserInfos.service";


export const createProductController = async (
    req: Request,
    res: Response
  ):Promise<Response> => {
    const userUUID: string = res.locals.userUUID;
    const data: productsRequest = req.body;
  
    const newProduct= await createProductService(userUUID, data);

    return res.status(201).json(newProduct)
  
   
  };


export const listAllProductsController = async (req:Request, res:Response):Promise<Response>=> {

  const allProducts = await listAllProductsService()

  return res.status(200).json(allProducts)
}


export const listUniqueProductController = async (req:Request, res:Response): Promise<Response> =>{
  const product = await listUniqueProductService(req.params.uuid.toString())


  return res.status(200).json(product)
}


export const deleteProductController = async (req:Request, res:Response):Promise<Response> => {
    await deleteProductService(req.params.uuid)
    return res.status(200).json()
}


export const validatedUserCodeController = (req: Request, res: Response):Response => {
  
  return res.status(200).json({ 
    "message": "Valid Token"
  })
}


export const listUserInfosController = async (req:Request, res:Response): Promise<Response> => {
    const user = await listUserInfosService(res.locals.userUUID)

    return res.status(200).json(user)
  }