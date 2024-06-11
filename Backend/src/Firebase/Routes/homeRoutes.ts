import { HomeController } from "../Controllers/homeController";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";

const homeRoutes = Router();

// TODO: middleware
homeRoutes.get("/getCourses", HomeController.getCourses);

homeRoutes.get("/getStudent", HomeController.getStudent);

homeRoutes.get("/getStudentActiveCourse/:studentEmail", HomeController.getStudentByEmail)

export { homeRoutes };
