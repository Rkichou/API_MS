const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes pour le panier
router.post('/add', cartController.addItemToCart);
router.delete('/remove', cartController.removeItemFromCart);
router.put('/update', cartController.updateItemQuantity);
router.get('/:userId', cartController.getCart); // Récupérer le panier d'un utilisateur spécifique
router.delete('/clear/:userId', cartController.clearCart);
router.get('/all', cartController.getAllCarts);

module.exports = router;
