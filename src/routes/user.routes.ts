import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { addProductToCartController, createUserController, listUserInfosController, removeProductInCartController, resetPasswordController, sendEmailResetPasswordController, validatedUserCodeController } from "../controllers/user.controller";
import {  userSchemaEmailResetPassword, userSchemaPasswordReset, userSchemaRequest } from "../schemas/user.schema";
import { ensureEmailAndCPFAlreadyExistsMiddleware } from "../middlewares/ensureEmailAndCPFNotExists.middleware";
import { ensureResetPasswordTokenIsValidMiddleware } from "../middlewares/ensureResetPasswordTokenIsValid.middleware";
import { ensureUserIsAuthMiddleware } from "../middlewares/ensureUserIsAuth.middleware";
import { ensureCodeIsValidMiddleware } from "../middlewares/ensureCodeIsValid.middleware";
import { ensureProductExistsMiddleware } from "../middlewares/ensureProductExists.middleware";
import { cartSchemaRequest } from "../schemas/cart.schema";
import { ensureProductIsInCartMiddleware } from "../middlewares/ensureProductIsInCart.middleware";


export const userRoutes: Router = Router()


userRoutes.post(
    "", 
    ensureDataIsValidMiddleware(userSchemaRequest), 
    ensureEmailAndCPFAlreadyExistsMiddleware, 
    createUserController
)

userRoutes.post(
    "/resetPassword", 
    ensureDataIsValidMiddleware(userSchemaEmailResetPassword), 
    sendEmailResetPasswordController)

userRoutes.patch(
    "/resetPassword/:token", 
    ensureDataIsValidMiddleware(userSchemaPasswordReset)
    , ensureResetPasswordTokenIsValidMiddleware, 
    resetPasswordController)


userRoutes.get(
    "/codeApply/:code", 
    ensureUserIsAuthMiddleware, 
    ensureCodeIsValidMiddleware, 
    validatedUserCodeController )


userRoutes.get(
    "", 
    ensureUserIsAuthMiddleware, 
    listUserInfosController)

userRoutes.post(
    "/cart/product/:uuid", 
    ensureUserIsAuthMiddleware, 
    ensureProductExistsMiddleware,
    ensureDataIsValidMiddleware(cartSchemaRequest),
    addProductToCartController)

userRoutes.delete(
    "/cart/product/:uuid",
    ensureUserIsAuthMiddleware,
    ensureProductIsInCartMiddleware,
    removeProductInCartController
)