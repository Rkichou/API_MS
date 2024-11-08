import Products from "../models/ModelsProducts";
import { Request, Response } from "express";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - _id
 *         - prix
 *         - name
 *         - description
 *         - disponibilite
 *         - categorie
 *         - tags
 *       properties:
 *         _id:
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
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Les tags associés au produit
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
const allProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des produits", error });
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
const productById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Produit non trouvé" });
      return;
    }

    const similarProducts = await Products.find({
      $or: [
        { categorie: { $in: product.tags } },        // Produits dont la catégorie correspond à l'un des tags du produit actuel
      ],
      _id: { $ne: product._id }                       // Exclure le produit actuel
    }).limit(5);  

    // Retourne à la fois le produit et les recommandations
    res.json({ product, recommendations: similarProducts });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
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
const newProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, price, name, description, disponibilite, categorie, image, tags } =
      req.body;
    const product = new Products({
      _id,
      price,
      name,
      description,
      disponibilite,
      categorie,
      image,
      tags
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit", error });
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
    const { _id } = req.body;
    console.log("ID du produit à supprimer:", _id); // Log de l'ID du produit

    if (!_id) {
      console.log("ID du produit manquant");
      res.status(400).json({ message: "ID du produit manquant" });
      return;
    }

    const product = await Products.findByIdAndDelete(_id);
    if (!product) {
      console.log("Produit non trouvé");
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    console.log("Produit supprimé avec succès");
    res.status(201).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du produit", error });
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
    const { _id, price, name, description, disponibilite, categorie, image, tags } =
      req.body;
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      {
        _id,
        price,
        name,
        description,
        disponibilite,
        categorie,
        image,
        tags
      },
      { new: true }
    );
    if (!product) {
      res.status(400).json({ message: "Erreur lors de la mise à jour" });
      return;
    }
    res
      .status(201)
      .json({ message: "Produit mis à jour avec succès", product });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du produit", error });
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
