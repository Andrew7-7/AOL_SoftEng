import { CoursesController } from "../Controllers/courseControllers";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";

const coursesRoutes = Router();

// TODO: middleware
coursesRoutes.get("/getCourses", CoursesController.getCourses);
coursesRoutes.get("/getCourse/:courseId", CoursesController.getCourse);

coursesRoutes.get("/getCourseById/:courseId", CoursesController.getCourseById);

export { coursesRoutes };
