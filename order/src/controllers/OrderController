const Order = require('../models/OrderModel.js');

const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = new Order({ userId, items, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder };