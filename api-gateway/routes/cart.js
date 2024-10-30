// routes/cart.js
const express = require('express');
const axios = require('axios');

const router = express.Router();

// Route pour gérer les cart
router.all('/*', async (req, res) => {
  try {
    const response = await axios({
      method: req.method,
      url: `http://localhost:3003${req.originalUrl}`, // URL du microservice des cart
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      message: error.message,
    });
  }
});

module.exports = router;
