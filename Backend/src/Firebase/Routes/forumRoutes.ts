import { extraAuthorization } from "../../middleware/extraAuth";
import { Router } from "express";
import { forumControllers } from "../Controllers/forumControllers";

const forumRoutes = Router();

forumRoutes.post("/getForum", extraAuthorization, forumControllers.getForum);

forumRoutes.get("/forumRoom/:forumsId/ForumDetail", extraAuthorization, forumControllers.getForumDetail);

forumRoutes.get("/forumRoom/:forumsId/Replies", extraAuthorization, forumControllers.getReplies);

forumRoutes.post("/forumRoom/:forumsId/SendReply", extraAuthorization, forumControllers.sendReply);

forumRoutes.put("/forumRoom/:forumsId/replies/:replyId", extraAuthorization, forumControllers.updateReply);

forumRoutes.put("/forumRoom/:forumId", extraAuthorization, forumControllers.updateForum);

forumRoutes.post("/postForum", extraAuthorization, forumControllers.postForum);

forumRoutes.delete('/forum/:forumId/replies/:replyId', forumControllers.deleteReply);

forumRoutes.delete('/deleteForum/:forumId', forumControllers.deleteForum);

forumRoutes.post('/incrementView/:forumId', forumControllers.incrementView);

export {forumRoutes};