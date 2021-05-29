import express from "express";
import auth from "../middleware/auth.js";
import * as controllers from '../controllers/conversation.js'

const router = express.Router();

// get
router.get("/list/my", auth, controllers.getConversationsOfUser);
router.get("/:conversationId", auth, controllers.getAConversation);

// post
router.post("/", auth, controllers.createConversation);

// put
router.put("/:conversationId/addMessage", auth, controllers.addMessage);

export default router;