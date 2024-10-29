import express from "express";
import ProductsController from "../controllers/ControllersProduct";

const router = express.Router();
router.get("/liste", ProductsController.allProduct);
router.get("/liste/:id", ProductsController.productById);
router.post("/create", ProductsController.newProduct);
router.put("/update", ProductsController.updateProduct);
router.delete("/delete", ProductsController.deleteProduct);

export default router;
