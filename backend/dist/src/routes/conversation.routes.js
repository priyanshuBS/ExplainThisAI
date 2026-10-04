import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CreateConversation, GetConversation } from "../controllers/conversation.controller.js";
const router = Router();
router.post("/", authMiddleware, CreateConversation);
router.get("/:conversationId", authMiddleware, GetConversation);
export default router;
