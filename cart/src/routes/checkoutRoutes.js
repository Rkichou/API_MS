const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Route pour démarrer une session de checkout Stripe
router.post('/create-session', checkoutController.createCheckoutSession);

module.exports = router;
