import express from "express";
import orderController from "../controllers/OrderController.js";

const router = express.Router();

// Créer une nouvelle commande
router.post("/create", orderController.createOrder);
// recuperer les commandes
router.get("/", orderController.getOrders);

// Récupérer une commande spécifique par son ID
router.get("/:id", orderController.getOrderById);

// Récupérer toutes les commandes d'un utilisateur spécifique
router.get("/user/:user_id", orderController.getOrdersByUser);

// Mettre à jour le statut d'une commande
router.put("/update/:id", orderController.updateOrderStatus);

// Annuler une commande
router.put("/cancel/:id", orderController.cancelOrder);

router.delete("/:id", orderController.delOrder);

export default router;
