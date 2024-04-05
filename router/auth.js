import Router from "koa-router";
import AuthController from "../controllers/authentication.js";

const authRouter = new Router();

// Example authentication routes
authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
