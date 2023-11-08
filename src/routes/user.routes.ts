import { Router } from "express";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { createUserController } from "../controllers/user.controller";
import {  userSchemaRequest } from "../schemas/user.schema";
import { ensureEmailAndCPFNotExistsMiddleware } from "../middlewares/ensureEmailAndCPFNotExists.middleware";

export const userRoutes: Router = Router()


userRoutes.post(
    "", 
    ensureDataIsValidMiddleware(userSchemaRequest), 
    ensureEmailAndCPFNotExistsMiddleware, 
    createUserController
)
