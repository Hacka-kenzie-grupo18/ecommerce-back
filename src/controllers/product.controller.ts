import { Request, Response } from "express";
import { productResponseArrayPaginated, products, productsRequest, productsRequestUpdate } from "../interfaces/product.interfaces";
import { createProductService } from "../services/product/createProduct.service";
import { editProductService } from "../services/product/editProduct.service";
import { listAllProductsService } from "../services/product/listAllProducts.service";
import { listAllProductsUserService } from "../services/product/listAllProductsUser.service";
import { deleteProductService } from "../services/product/deleteProduct.service";

export const createProductController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const userUUID: string = res.locals.userUUID;
    const data: productsRequest = req.body;
  
    const newProduct: products = await createProductService(userUUID, data);
  
    return res.status(201).json(newProduct);
  };

  export const editPostController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const productUUID: string = req.params.uuid;
    const data: productsRequestUpdate = req.body;
  
    const editProduct: products = await editProductService(data, productUUID);
  
    return res.status(200).json(editProduct);
  };

  export const listAllProductsController = async (req: Request, res: Response) => {
    const { limit, offset } = req.query;
  
    const products: productResponseArrayPaginated = await listAllProductsService(
      limit,
      offset
    );
    return res.status(200).json(products);
  };

  export const listAllProductsUserController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { limit, offset } = req.query;
    const userUUID: string = req.params.uuid;
  
    const products = await listAllProductsUserService(limit, offset, userUUID);
  
    return res.status(200).json(products);
  };

  export const deleteProductController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const productUUID: string = req.params.uuid;
    await deleteProductService(productUUID);
    return res.status(204).json();
  };