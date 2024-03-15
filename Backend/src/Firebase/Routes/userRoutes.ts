import { extraAuthorization } from "../../middleware/extraAuth";
import { UserControllers } from "../Controllers/userControllers";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/getUsers", extraAuthorization, UserControllers.getUser);

userRoutes.post("/addUser", extraAuthorization, UserControllers.registerUser);

export { userRoutes };
