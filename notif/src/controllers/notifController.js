import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Fonction pour envoyer un email
const sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;

  // Configurer le transporteur de mail
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email envoyé avec succès" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi de l'email",
      error,
    });
  }
};

export default {
  sendEmail,
};
