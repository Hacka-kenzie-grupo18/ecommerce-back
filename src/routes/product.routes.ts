import { Router } from "express";
import { createProductController, listAllProductsController } from "../controllers/product.controller";
import { ensureIsAdminUser } from "../middlewares/ensureIsAdminUser.middleware";
import {  productSchemaRequest } from "../schemas/product/product.schema";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureUserIsAuthMiddleware } from "../middlewares/ensureUserIsAuth.middleware";

export const productRoutes: Router = Router()


productRoutes.post(
    "", 
    ensureUserIsAuthMiddleware,
    ensureIsAdminUser, 
    ensureDataIsValidMiddleware(productSchemaRequest), 
    createProductController
)

productRoutes.get("", ensureUserIsAuthMiddleware, listAllProductsController)

// productRoutes.patch(
//     "/:uuid", 
//     ensureDataIsValidMiddleware(productSchemaRequestUpdate), 
//     ensureIsAdminUser, 
//     editProductController
// )

// productRoutes.delete(
//     "/:uuid",
//     deleteProductController
//   );

