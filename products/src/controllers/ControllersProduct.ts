import Products from "../models/ModelsProducts";
import { Request, Response } from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - user_id
 *         - prix
 *         - name
 *         - description
 *         - disponibilite
 *         - categorie
 *       properties:
 *         user_id:
 *           type: string
 *           description: L'identifiant de l'utilisateur qui ajoute le produit
 *         prix:
 *           type: number
 *           description: Le prix du produit
 *         name:
 *           type: string
 *           description: Le nom du produit
 *         description:
 *           type: string
 *           description: La description du produit
 *         disponibilite:
 *           type: boolean
 *           description: Disponibilité du produit
 *         categorie:
 *           type: string
 *           description: La catégorie du produit
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Récupère tous les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: La liste des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Erreur lors de la récupération des produits
 */
const allProduct = async (req: Request, res: Response): Promise<void>  => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error });
    return;
  }
};

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Récupère un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du produit
 *     responses:
 *       200:
 *         description: Le produit correspondant à l'ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur lors de la récupération du produit
 */
const productById = async (req: Request, res: Response):  Promise<void>  => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Produit non trouvé" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
    return;
  }
};

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crée un nouveau produit
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produit créé avec succès
 *       500:
 *         description: Erreur lors de la création du produit
 */
const newProduct = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { user_id, prix, name, description, disponibilite, categorie } =
      req.body;
    const product = new Products({
      user_id,
      prix,
      name,
      description,
      disponibilite,
      categorie,
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit", error });
    return;
  }
};

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Supprime un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du produit
 *     responses:
 *       204:
 *         description: Produit supprimé avec succès
 *       400:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur lors de la suppression du produit
 */
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Erreur lors de la suppression" });
      return;
    }
    res.status(204).json({ message: "Le produit a bien été supprimé" });
    return;
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error });
    return;
  }
};

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Met à jour un produit par ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du produit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       400:
 *         description: Produit non trouvé
 *       500:
 *         description: Erreur lors de la mise à jour du produit
 */
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id, prix, name, description, disponibilite, categorie } =
      req.body;
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        user_id,
        prix,
        name,
        description,
        disponibilite,
        categorie,
      },
      { new: true }
    );
    if (!product) {
      res.status(400).json({ message: "Erreur lors de la mise à jour" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du produit", error });
    return;
  }
};

export default {
  allProduct,
  productById,
  newProduct,
  deleteProduct,
  updateProduct,
};
