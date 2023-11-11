import { Router } from "express";
import { createProductController, deleteProductController, editProductController, listAllProductsController, listAllProductsUserController } from "../controllers/product.controller";
import { ensureIsAdminUser } from "../middlewares/ensureIsAdminUser.middleware";
import {  productSchemaRequest, productSchemaRequestUpdate } from "../schemas/product.schema";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureUserIsAuthMiddleware } from "../middlewares/ensureUserIsAuth.middleware";

export const productRoutes: Router = Router()


productRoutes.post(
    "", 
    ensureUserIsAuthMiddleware,
    ensureDataIsValidMiddleware(productSchemaRequest), 
    ensureIsAdminUser, 
    createProductController
)

productRoutes.patch(
    "/:uuid", 
    ensureDataIsValidMiddleware(productSchemaRequestUpdate), 
    ensureIsAdminUser, 
    editProductController
)

productRoutes.delete(
    "/:uuid",
    deleteProductController
  );

productRoutes.get("/:uuid", listAllProductsUserController);

productRoutes.get("", listAllProductsController);