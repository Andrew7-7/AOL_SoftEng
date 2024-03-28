import { chatControllers } from "../Controllers/chatControllers";
import { extraAuthorization } from "../../middleware/extraAuth";
import { Router } from "express";

const chatRoutes = Router();

chatRoutes.get("/getChat", extraAuthorization, chatControllers.getChatRoom);

export { chatRoutes };
