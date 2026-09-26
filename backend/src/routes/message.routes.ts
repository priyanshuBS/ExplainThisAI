import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { CreateMessage } from "../controllers/message.controller.js";

const router = Router();

router.post("/:conversationId/messages", authMiddleware, CreateMessage);

export default router;