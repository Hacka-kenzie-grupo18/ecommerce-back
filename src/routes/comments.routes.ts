import { Router } from "express";
import { createCommentsController, deleteCommentController, listAllCommentsController, updateCommentController } from "../controllers/comments.controller";
import { ensureCommentExistsMiddleware } from "../middlewares/ensureCommentExists.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureProductExistsMiddleware } from "../middlewares/ensureProductExists.middleware";
import { ensureUserIsAuthMiddleware } from "../middlewares/ensureUserIsAuth.middleware";
import { ensureUserIsCommentOwnerMiddleware } from "../middlewares/ensureUserIsCommentOwner.middleware";
import { commentsRequestSchema, commentsRequestUpdate } from "../schemas/comments";

export const commentsRoutes:Router = Router()


commentsRoutes.post(
    "/:uuid",
    ensureUserIsAuthMiddleware,
    ensureProductExistsMiddleware,
    ensureDataIsValidMiddleware(commentsRequestSchema),
    createCommentsController
    )

commentsRoutes.delete(
    "/:uuid",
    ensureUserIsAuthMiddleware,
    ensureCommentExistsMiddleware,
    ensureUserIsCommentOwnerMiddleware,
    deleteCommentController
)

commentsRoutes.get(
    "",
    ensureUserIsAuthMiddleware,
    listAllCommentsController
)

commentsRoutes.patch(
    "/:uuid",
    ensureUserIsAuthMiddleware,
    ensureCommentExistsMiddleware,
    ensureUserIsCommentOwnerMiddleware,
    ensureDataIsValidMiddleware(commentsRequestUpdate),
    updateCommentController
)
