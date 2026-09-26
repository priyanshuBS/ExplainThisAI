import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { searchDocumentsController } from "../controllers/search.controller.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  searchDocumentsController
);

export default router;