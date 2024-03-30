import { chatControllers } from "../Controllers/chatControllers";
import { extraAuthorization } from "../../middleware/extraAuth";
import { Router } from "express";

const chatRoutes = Router();

chatRoutes.get(
  "/getChat",
  extraAuthorization,
  chatControllers.getChatRoom,
  chatControllers.getMessages
);

chatRoutes.get(
  "/chatRoom/:roomID/Messages",
  extraAuthorization,
  chatControllers.getMessages
);

export { chatRoutes };
