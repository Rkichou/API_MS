import express from "express";
import userController from "../controllers/UserController"; // Assurez-vous que le chemin est correct
const router = express.Router();
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/delete", userController.del);

export default router;
