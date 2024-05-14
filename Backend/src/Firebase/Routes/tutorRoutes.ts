import { TutorController } from "../Controllers/tutorController";
import { Router } from "express";
import { accToken } from "../../middleware/accToken";
import { extraAuthorization } from "middleware/extraAuth";

const tutorRoutes = Router();

// TODO: middleware
tutorRoutes.get("/getTutors", TutorController.getTutors);

export { tutorRoutes };
