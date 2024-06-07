import { Router } from "express";
import { reportControllers } from "../Controllers/reportControllers";

const reportRoutes = Router ()

reportRoutes.get("/getReports", reportControllers.getAllReport);

export { reportRoutes };