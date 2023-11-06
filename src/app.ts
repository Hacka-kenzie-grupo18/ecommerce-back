import "express-async-errors"
import express, { Application } from "express";
import { handlerError } from "./middlewares/handleError.middleware";

const app:Application = express()
app.use(express.json())



app.use(handlerError)

export default app