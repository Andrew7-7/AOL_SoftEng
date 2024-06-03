import { CoursesController } from "../Controllers/courseControllers";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "../../middleware/extraAuth";
import multer from "multer";
const coursesRoutes = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// TODO: middleware
coursesRoutes.get("/getCourses", CoursesController.getCourses);
coursesRoutes.get("/getCourse/:courseId", CoursesController.getCourse);

coursesRoutes.get("/getCourseById/:courseId", CoursesController.getCourseById);
coursesRoutes.post(
	"/createCourse",
	upload.single("imageURL"),
	CoursesController.createCourse
);

coursesRoutes.post(
	"/updateCourse",
	upload.single("imageURL"),
	CoursesController.updateCourse
);

export { coursesRoutes };
