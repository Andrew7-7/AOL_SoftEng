import { extraAuthorization } from "../../middleware/extraAuth";
import { UserControllers } from "../Controllers/userControllers";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/getUsers", extraAuthorization, UserControllers.getUser);

userRoutes.post("/register", extraAuthorization, UserControllers.registerUser);

export { userRoutes };
