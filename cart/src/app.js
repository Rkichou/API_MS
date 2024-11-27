
const express = require('express');
const connectDB = require('../src/config/db'); 
const swaggerDocs = require('../src/config/Swagger');
const stripe = require('stripe')('sk_test_51QFG6SRsLyr6WwcbLgwLURohiRZbgq0AJv35ZSmnxJoxbQFfWCKs63inmXKYv2T7lsolsyWaZntAodF9spCevW2a00dUlVFAlF'); // Remplacez par votre clé secrète Stripe

const app = express();
swaggerDocs(app);

// Connexion à la base de données
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/cart', require('../src/routes/cartRoutes'));
app.use('/api/checkout', require('../src/routes/checkoutRoutes')); // Nouvelle route pour le checkout


// Démarrer le serveur
const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Swagger documentation available at http://localhost:3003/api-docs');

});
