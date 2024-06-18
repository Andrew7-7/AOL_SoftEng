import { chatControllers } from "../Controllers/chatControllers";
import { extraAuthorization } from "../../middleware/extraAuth";
import { Router } from "express";

const chatRoutes = Router();

chatRoutes.post(
  "/getChat",
  // extraAuthorization,
  chatControllers.getChatRoom
);

chatRoutes.get(
  "/chatRoom/:roomID/Messages",
  // extraAuthorization,
  chatControllers.getMessages
);

chatRoutes.post(
  "/postMessage",
  // extraAuthorization,
  chatControllers.sendMessage
);

export { chatRoutes };
