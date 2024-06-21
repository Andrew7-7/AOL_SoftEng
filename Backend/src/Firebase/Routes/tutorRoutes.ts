import { TutorController } from "../Controllers/tutorController";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "middleware/extraAuth";

const tutorRoutes = Router();

// TODO: middleware
tutorRoutes.get("/getTutors/:courseId", TutorController.getTutors);

tutorRoutes.get("/getTutor/:tutorId", TutorController.getTutor);

tutorRoutes.post("/getActiveClass", accToken, TutorController.getActiveClass);
tutorRoutes.post(
  "/getActiveClassDetail",
  accToken,
  TutorController.getActiveClassDetail
);
tutorRoutes.post("/editSessionTime", accToken, TutorController.editSessionTime);
tutorRoutes.put(
  "/submitAttendance",
  accToken,
  TutorController.submitAttendance
);

tutorRoutes.post("/studentApplyClass", TutorController.studentApplyClass);

tutorRoutes.post(
  "/getCurrActiveClassDetail",
  TutorController.getCurrActiveClass
);

tutorRoutes.post("/createReview", TutorController.createReview);

export { tutorRoutes };
