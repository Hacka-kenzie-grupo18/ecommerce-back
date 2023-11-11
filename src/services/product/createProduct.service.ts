import prisma from "../../database/prisma";
import { productResponse,  productsRequest } from "../../interfaces/product.interfaces";
import {  productSchemaResponse } from "../../schemas/product.schema";

export const createProductService = async (
  userUUID: string,
  data: productsRequest
): Promise<productResponse> => {

  const {category} = data

  const newProduct = await prisma.product.create({data:{user_author: userUUID, ...data}})


  const categorieExists = await prisma.categories.findFirst({
    where:{category: {
      contains: category!
    }}
  })

  if(!categorieExists){
    const newCategory = await prisma.categories.create({data: {category: data.category}})
    
    await prisma.productCategories.create({data: 
      {product_uuid: newProduct.uuid, 
      category_uuid: newCategory.uuid}})

  }else{
    await prisma.productCategories.create({data: {
      product_uuid: newProduct.uuid, 
      category_uuid: categorieExists.uuid}})
  }

  return productSchemaResponse.parse(newProduct)

};
