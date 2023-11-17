import { string } from "zod";
import prisma from "../../../database/prisma";
import AppError from "../../../errors/app.errors";

export const checkIfExists = async (colors:string[], sizes:string[], category:string, theme:string[]) => {
    
try {
    
    const colorExists = await prisma.colors.findMany({
        where:{
            color:{
                in: colors,
                mode: "insensitive"
            }
        }
    })
    const nonExistingColor = colors.filter(color => !colorExists.some(c => c.color == color))
    const createdColors = await Promise.all(nonExistingColor.map(async elem => {
        return prisma.colors.create({
            data: {color: elem}
        })
    }))
    const allColors = [...colorExists, ...createdColors]


    const categoryExists = await prisma.categories.findFirst({
        where: {
            category: {
                contains: category,
                mode: "insensitive"
            }
        }
    })
    let createdCategory
    if (!categoryExists){
         createdCategory = await prisma.categories.create({
            data: {category}
        })
    }else{
        createdCategory = categoryExists
    }



    const sizesExists = await prisma.sizes.findMany({
        where:{
            size: {
                in: sizes,
                mode: 'insensitive'
            }
        }
    })
    const nonExistingSizes = sizes.filter(sizeElem => !sizesExists.some(s => s.size == sizeElem))
    const createdSizes = await Promise.all(nonExistingSizes.map(async elem => {
        return prisma.sizes.create({
            data: {
                size: elem
            }
        })
    }))
    const allSizes = [...sizesExists, ...createdSizes]


    const themeExists = await prisma.themes.findMany({
        where:{
            theme: {
                in: theme,
                mode: 'insensitive'
            }
        }
    })
    const nonExistingTheme = theme.filter(themeElem => !themeExists.some(t => t.theme == themeElem))
    const createdTheme = await Promise.all(nonExistingTheme.map(async elem => {
        return prisma.themes.create({
            data: {
                theme: elem
            }
        })
    }))
    const allThemes = [...themeExists, ...createdTheme]

    return {
        allColors,
        allSizes,
        allThemes,
        createdCategory
    }


} catch (error) {
    console.log(error)
    throw new AppError("Ocorreu um erro ao inserir dados", 500)
}

}