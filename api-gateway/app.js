// gateway.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3005;

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Route vers le microservice des utilisateurs
app.use('/order', async (req, res) => {
    try {
      const response = await axios({
        method: req.method,
        url: `http://localhost:3000${req.originalUrl}`, // URL du microservice des orders
        data: req.body,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({
        message: error.message,
      });
    }
  });

// Route vers le microservice des utilisateurs
app.use('/users', async (req, res) => {
    try {
      const response = await axios({
        method: req.method,
        url: `http://localhost:3001${req.originalUrl}`, // URL du microservice des utilisateurs
        data: req.body,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({
        message: error.message,
      });
    }
  });

// Route vers le microservice des produits
app.use('/products', async (req, res) => {
  try {
    const response = await axios({ 
      method: req.method,
      url: `http://localhost:3002${req.originalUrl}`, // URL du microservice des produits
      data: req.body,
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      message: error.message,
    });
  }
});

// Route vers le microservice des carts
app.use('/cart', async (req, res) => {
    try {
      const response = await axios({
        method: req.method,
        url: `http://localhost:3003${req.originalUrl}`, // URL du microservice des utilisateurs
        data: req.body,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(error.response ? error.response.status : 500).json({
        message: error.message,
      });
    }
  });

// Lancer l'API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
