import express, { json } from "express";
import swaggerDocs from "./config/Swagger.js"; // Chemin du fichier swagger.js
import notifRoutes from "./routes/notifRoutes.js";

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(json());

// Swagger documentation
swaggerDocs(app);

// Routes
app.use("/notifications", notifRoutes);
app.use("/", (req, res) => {
  res.send("Notification service");
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
  console.log(
    `Swagger documentation available at http://localhost:${PORT}/api-docs`
  );
});
