import express from "express";
import userController from "../controllers/UserController";
const router = express.Router();
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/delete", userController.del);

export default router;
