import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CreateConversation } from "../controllers/conversation.controller.js";

const router = Router();

router.post("/", authMiddleware, CreateConversation);

export default router;