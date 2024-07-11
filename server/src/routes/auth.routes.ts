import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from "../middleware/auth.validation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
