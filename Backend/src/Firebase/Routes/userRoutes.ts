import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import { UserControllers } from "../Controllers/userControllers";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/getUsers", accToken, UserControllers.getUser);

userRoutes.post("/register", extraAuthorization, UserControllers.registerUser);

userRoutes.post("/login", extraAuthorization, UserControllers.loginUser);

export { userRoutes };
