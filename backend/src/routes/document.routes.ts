import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import { UploadDocuments } from "../controllers/document.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/upload", authMiddleware, upload.array("documents", 10), UploadDocuments);

export default router;