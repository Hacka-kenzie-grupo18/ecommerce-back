import prisma from "../../database/prisma";
import {   productsRequest } from "../../interfaces/product.interfaces";
import {  productSchemaResponse } from "../../schemas/product/product.schema";
import { checkIfExists } from "./utils/checkIfExists";
import { format } from "./utils/format";

export const createProductService = async (
  userUUID: string,
  data: productsRequest
) => {

  const {category, theme, images, sizes, colors, ...rest} = data

  

  
  const {
    themeFormated, 
    categoryFormated, 
    sizesFormated, 
    colorsFormated} = format(
      theme, 
      category, 
      sizes, 
      colors
      )
      
      const createdDatas = await checkIfExists(colorsFormated, sizesFormated, categoryFormated, themeFormated)
     
      
    try {

      let productResponse

      await prisma.$transaction(async (prisma) => {

      

      const productCreated = await prisma.product.create({
        data: {
          user_author: userUUID,
          ...rest
        }
      })


       await Promise.all(images.map(async (e) => {
       return prisma.imagesProduct.create({
         data:{
           images_url: e,
           product_uuid: productCreated.uuid
         }
       })
     }))

     await Promise.all(createdDatas.allThemes.map(async (e) => {
      return prisma.productThemes.create({
        data:{
          product_uuid: productCreated.uuid,
          theme_uuid: e.uuid
        }
      })
     }))

     await Promise.all(createdDatas.allColors.map(async (e) => {
        return prisma.productColors.create({
          data:{
            product_uuid: productCreated.uuid,
            color_uuid: e.uuid
          }
        })
     }))

     await Promise.all(createdDatas.allSizes.map(async (e) => {
      return prisma.productSizes.create({
        data:{
          product_uuid: productCreated.uuid,
          size_uuid: e.uuid
        }
      })
     }))

     await prisma.productCategories.create({
      data: {
        product_uuid: productCreated.uuid,
        category_uuid: createdDatas.createdCategory.uuid
      }
     })


      productResponse = await prisma.product.findFirst({
      where: {
        uuid: productCreated.uuid,
      },
      include: {
        product_categories: {
          include: {
            categories: true, 
          },
        },
        product_colors: {
          include: {
            color: true, 
          },
        },
        product_images: true,
        product_sizes: {
          include: {
            size: true, 
          },
        },
        product_themes: {
          include: {
            theme: true, 
          },
        },
        user: true,
      },
    });

    
  })
  return productResponse
     
   } catch (error) {
    console.log(error)
   }
  

};
