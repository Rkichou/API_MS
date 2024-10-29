// routes/OrderRoute.js
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Commande reçue avec succès !' });
});

export default router;
