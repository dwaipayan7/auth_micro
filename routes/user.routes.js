import { Router } from "express";
import userController from "../controller/user.controller.js";



const router = Router();

router.get("/getUser/:id",userController.getUser);


export default router;