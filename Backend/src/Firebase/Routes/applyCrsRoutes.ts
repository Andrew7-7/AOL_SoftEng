import { Router } from "express";
import { extraAuthorization } from "../../middleware/extraAuth";
import { courseControllers } from "../Controllers/applyCrsControllers";

const tutorCourse = Router()

tutorCourse.get("/getPermissions", extraAuthorization, courseControllers.getApplication)
tutorCourse.get("/getTutorCourses", extraAuthorization, courseControllers.getTutorCourses)

export {tutorCourse}