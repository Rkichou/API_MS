import express from "express";
import ProductsController from "../controllers/ControllersProduct";

const router = express.Router();
router.get("/product", ProductsController.allProduct);
router.get("/product/:id", ProductsController.productById);
router.post("/product/create", ProductsController.newProduct);
router.put("/update", ProductsController.updateProduct);
router.delete("/delete", ProductsController.deleteProduct);

export default router;
