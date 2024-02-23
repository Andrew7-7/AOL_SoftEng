import { UserControllers } from "../Controllers/userControllers.mjs";
import { Router } from "express";

const userRoutes = Router();

userRoutes.get('/getUsers',UserControllers.getUser);

export {userRoutes}