import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import { UploadDocument } from "../controllers/document.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/upload", authMiddleware, upload.single("file"), UploadDocument);

export default router;