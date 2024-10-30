// src/controllers/OrderController.js

import Order from "../models/OrderModel.js";

// Créer une nouvelle commande
const createOrder = async (req, res) => {
  try {
    const { user_id, items, totalAmount } = req.body;
    const newOrder = new Order({ user_id, items, totalAmount });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande." });
  }
};
// Récperer les commandes
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieves all orders from the database
    res.status(200).json(orders); // Respond with the orders in JSON format
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes." });
  }
};

// Récupérer une commande spécifique par ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Commande non trouvée." });
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la commande." });
  }
};

// Récupérer toutes les commandes d'un utilisateur
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.params.user_id });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des commandes." });
  }
};

// Mettre à jour le statut d'une commande
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(
      `Attempting to update order with id: ${id} to status: ${status}`
    );

    const order = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      console.log(`Order with id: ${id} not found`);
      return res.status(404).json({ message: "Order not found" });
    }

    console.log(
      `Order with id: ${id} updated successfully to status: ${status}`
    );
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Annuler une commande
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Commande non trouvée." });

    order.status = "cancelled";
    const cancelledOrder = await order.save();
    res.json(cancelledOrder);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'annulation de la commande." });
  }
};

const delOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete order with id: ${id}`);

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      console.log(`Order with id: ${id} not found`);
      return res.status(404).json({ message: "Order not found" });
    }

    console.log(`Order with id: ${id} deleted successfully`);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  createOrder,
  getOrderById,
  getOrders,
  getOrdersByUser,
  updateOrderStatus,
  cancelOrder,
  delOrder,
};
