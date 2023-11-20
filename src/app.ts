import "express-async-errors";
import express, { Application } from "express";
import { handlerError } from "./middlewares/handleError.middleware";
import { userRoutes } from "./routes/user.routes";
import { loginRoutes } from "./routes/login.routes";
import { productRoutes } from "./routes/product.routes";
import { createAdminController } from "./controllers/user.controller";

const app: Application = express();
app.use(express.json());

app.use("/user", userRoutes);
app.use("/login", loginRoutes);
app.use("/product", productRoutes);

app.use(handlerError);

export default app;
