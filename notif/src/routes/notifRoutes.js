const express = require("express");
const { sendEmail } = require("../controllers/notifController");

const router = express.Router();

// Route pour envoyer un email
router.post("/send", sendEmail);

module.exports = router;
