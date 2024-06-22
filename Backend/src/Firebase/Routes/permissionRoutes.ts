import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import { PermissionControllers } from "../Controllers/requestCourseControllers";

const permissionRoutes = Router();

// TODO: middleware
permissionRoutes.get("/getPermissions", PermissionControllers.getPermissions);
permissionRoutes.get(
  "/getPermission/:permissionId",
  PermissionControllers.getPermission
);
permissionRoutes.post(
  "/updatePermission",
  PermissionControllers.updatePermission
);
permissionRoutes.get(
  "/getPermissionByTutorEmail/:tutorEmail",
  PermissionControllers.getPermissionsByTutorEmail
);

export { permissionRoutes };
