import { Router } from "express";
import userController from "../controller/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";


const router = Router();

router.get("/getUser/:id",authMiddleware ,userController.getUser);


export default router;