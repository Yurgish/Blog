import { Router } from "express";
import { checkAuth, login, logout, register } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from "../middleware/auth.validation";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/logout", authMiddleware, logout);
router.get("/check-auth", checkAuth);

export default router;
