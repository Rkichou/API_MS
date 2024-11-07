const express = require("express");
const swaggerDocs = require("./config/Swagger"); // Chemin du fichier swagger.js
const notifRoutes = require("./routes/notifRoutes");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3004;

// Middleware
app.use(express.json());

// Connexion à la base de données
connectDB();

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
