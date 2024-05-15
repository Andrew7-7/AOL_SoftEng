import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import { AdminControllers } from "../Controllers/adminControllers";
import { Router } from "express";
const adminRoutes = Router();

adminRoutes.get("/getUsers", accToken, AdminControllers.getUser);
adminRoutes.post("/blockUser", accToken, AdminControllers.blockUser);
adminRoutes.post("/warningUser", accToken, AdminControllers.warningUser);

export { adminRoutes };
