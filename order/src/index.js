import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/OrderRoute.js'; // Assure-toi d'inclure l'extension ".js" pour les imports ESM

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/order', routes);

// Gestion des erreurs
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).json({ message: 'Une erreur est survenue !' });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Microservice lancé sur le port ${PORT}`);
});
