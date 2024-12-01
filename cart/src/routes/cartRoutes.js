const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Routes pour le panier sans le préfixe /api
router.post('/cart/add', cartController.addItemToCart);
router.delete('/cart/remove', cartController.removeItemFromCart);
router.put('/cart/update', cartController.updateItemQuantity);
router.get('/cart/user/:user_id', cartController.getCart);
router.delete('/cart/clear/:user_id', cartController.clearCart);
router.get('/cart/all', cartController.getAllCarts);

module.exports = router;