import prisma from "../../database/prisma"

export const listUserInfosService = async (userUUID:string) => {
    const userInfos = await prisma.user.findFirst({
        where: {
            uuid: userUUID
        },
        include: {
            cart: {
                include: {
                    product: true
                }
            }
        }
    })
    return userInfos
}