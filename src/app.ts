import "express-async-errors"
import express, { Application } from "express";
import { handlerError } from "./middlewares/handleError.middleware";
import { userRoutes } from "./routes/user.routes";

const app:Application = express()
app.use(express.json())

app.use("/user", userRoutes)

app.use(handlerError)

export default app