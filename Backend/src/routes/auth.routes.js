
import express from "express";
import authController from "../controllers/auth.controller.js";
import authUser from "../middleware/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", authController.registerUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/logout", authController.logoutUserController);
authRouter.get("/get-me", authUser, authController.getMeController);

export default authRouter;