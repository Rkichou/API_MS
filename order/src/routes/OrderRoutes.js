const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Créer une nouvelle commande
router.post('/', orderController.createOrder);

// Récupérer une commande spécifique par son ID
router.get('/:id', orderController.getOrderById);

// Récupérer toutes les commandes d'un utilisateur spécifique
router.get('/user/:userId', orderController.getOrdersByUser);

// Mettre à jour le statut d'une commande
router.put('/:id/status', orderController.updateOrderStatus);

// Annuler une commande
router.delete('/:id', orderController.cancelOrder);

module.exports = router;
