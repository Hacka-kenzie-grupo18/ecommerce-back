import { Router } from "express";
import { createProductController, deleteProductController, listAllProductsController, listUniqueProductController } from "../controllers/product.controller";
import { ensureIsAdminUser } from "../middlewares/ensureIsAdminUser.middleware";
import {  productSchemaRequest } from "../schemas/product/product.schema";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureUserIsAuthMiddleware } from "../middlewares/ensureUserIsAuth.middleware";
import { ensureProductExistsMiddleware } from "../middlewares/ensureProductExists.middleware";
import { ensureAdmIsOwnerProductMiddleware } from "../middlewares/ensureAdmIsOwnerProduct.middleware";
import { commentsRequestSchema } from "../schemas/comments";
import { createCommentsController, deleteCommentController } from "../controllers/comments.controller";
import {  ensureCommentExistsMiddleware } from "../middlewares/ensureCommentExists.middleware";
import { ensureUserIsCommentOwnerMiddleware } from "../middlewares/ensureUserIsCommentOwner.middleware";

export const productRoutes: Router = Router()


productRoutes.post(
    "", 
    ensureUserIsAuthMiddleware,
    ensureIsAdminUser, 
    ensureDataIsValidMiddleware(productSchemaRequest), 
    createProductController
)

productRoutes.get("", ensureUserIsAuthMiddleware, listAllProductsController)

productRoutes.get(
    "/:uuid", 
    ensureUserIsAuthMiddleware,
    ensureProductExistsMiddleware,
    listUniqueProductController)

// productRoutes.patch(
//     "/:uuid", 
//     ensureDataIsValidMiddleware(productSchemaRequestUpdate), 
//     ensureIsAdminUser, 
//     editProductController
// )

productRoutes.delete(
    "/:uuid",
    ensureUserIsAuthMiddleware,
    ensureIsAdminUser,
    ensureProductExistsMiddleware,
    ensureAdmIsOwnerProductMiddleware,
    deleteProductController
  );

productRoutes.post(
    "/comments/:uuid",
    ensureUserIsAuthMiddleware,
    ensureProductExistsMiddleware,
    ensureDataIsValidMiddleware(commentsRequestSchema),
    createCommentsController
    )

productRoutes.delete(
    "/comments/:uuid",
    ensureUserIsAuthMiddleware,
    ensureCommentExistsMiddleware,
    ensureUserIsCommentOwnerMiddleware,
    deleteCommentController
)
