import express from "express";
import notifController from "../controllers/notifController.js";

const router = express.Router();

// Route pour envoyer un email
router.post("/send", notifController.sendEmail);

export default router;
