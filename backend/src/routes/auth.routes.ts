import { Router } from "express";
import { RegisterUser, LoginUser, LogoutUser, CurrentUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/logout", authMiddleware, LogoutUser);
router.get("/me", authMiddleware, CurrentUser);

export default router;