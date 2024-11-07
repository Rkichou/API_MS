const express = require("express");
const connectDB = require("../src/config/db"); // Chemin vers votre fichier de configuration
const swaggerDocs = require("../src/config/Swagger"); // Chemin du fichier swagger.js

const app = express();
swaggerDocs(app); // Applique la documentation Swagger

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json()); // Pour analyser les requêtes JSON

// Routes
app.use("/cart", require("../src/routes/cartRoutes")); // Intégrer vos routes
app.use("/", (req, res) => {
  res.send("cart service");
});
// Démarrer le serveur
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "Swagger documentation available at http://localhost:3003/api-docs"
  );
});
