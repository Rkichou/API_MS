import Products from "../models/ModelsProducts";
import { Request, Response } from "express";

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

const productById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      res.status(400).json({ message: "Produit non trouvé" });
      return;
    }

    // Recherche de produits similaires basée sur les tags et le score de performance
    const similarProducts = await Products.find({
      $and: [
        { _id: { $ne: product._id } }, // Exclure le produit actuel
        {
          $or: [
            { tags: { $in: product.tags } }, // Produits partageant des tags
            { 
              performance_score: { 
                $gte: product.performance_score ? product.performance_score * 0.8 : 0,
                $lte: product.performance_score ? product.performance_score * 1.2 : 0
              }
            }, // Produits avec un score de performance similaire (±20%)
            { categorie: product.categorie } // Produits de la même catégorie
          ]
        }
      ]
    })
    .limit(5)
    .select('name price description image tags performance_score categorie');

    // Trier les recommandations par pertinence
    const recommendationsWithScore = similarProducts.map(prod => {
      let relevanceScore = 0;
      
      // Points pour les tags communs
      const commonTags = prod.tags.filter(tag => product.tags.includes(tag));
      relevanceScore += commonTags.length * 2;
      
      // Points pour la catégorie
      if (prod.categorie === product.categorie) {
        relevanceScore += 3;
      }
      
      // Points pour le score de performance similaire
      if (product.performance_score && prod.performance_score) {
        const perfDiff = Math.abs(product.performance_score - prod.performance_score);
        if (perfDiff <= 10) relevanceScore += 3;
        else if (perfDiff <= 20) relevanceScore += 2;
        else if (perfDiff <= 30) relevanceScore += 1;
      }
      
      return {
        ...prod.toObject(),
        relevanceScore
      };
    }).sort((a, b) => b.relevanceScore - a.relevanceScore);

    res.json({ 
      product,
      recommendations: recommendationsWithScore.map(({ relevanceScore, ...prod }) => prod)
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error });
  }
};

const newProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, price, name, description, disponibilite, categorie, image, tags, performance_score } =
      req.body;
    const product = new Products({
      _id,
      price,
      name,
      description,
      disponibilite,
      categorie,
      image,
      tags,
      performance_score
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du produit", error });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id } = req.body;
    console.log("ID du produit à supprimer:", _id);

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

const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { _id, price, name, description, disponibilite, categorie, image, tags, performance_score } =
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
        tags,
        performance_score
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