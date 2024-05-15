import { CoursesController } from "../Controllers/courseControllers";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";

const homeRoutes = Router();

// TODO: middleware
homeRoutes.get("/getCourses", CoursesController.getCourses);

export { homeRoutes };
