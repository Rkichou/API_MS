const express = require('express');
const connectDB = require('../src/config/db'); // Chemin vers votre fichier de configuration

const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json()); // Pour analyser les requêtes JSON

// Routes
app.use('/api/cart', require('../src/routes/cartRoutes')); // Intégrer vos routes

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
