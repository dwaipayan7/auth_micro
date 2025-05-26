import { Router } from "express";
import authController from "../controller/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Private route to get logged-in user's info
router.get("/user", authMiddleware, authController.getUser);

export default router;
