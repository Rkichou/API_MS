import Products from "../models/ProductsModel";
import { Request, Response } from "express";

const allProduct = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    res.send(products);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération des produits", error });
  }
};

const productById = async (req: Request, res: Response) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Produit non trouvé" });
    }
    res.json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la récupération du produit", error });
  }
};

const newProduct = async (req: Request, res: Response) => {
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
    return res
      .status(500)
      .json({ message: "Erreur lors de la création du produit", error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(400).json({ message: "Erreur lors de la suppression" });
    }
    return res.status(204).json({ message: "Le produit a bien été supprimé" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la suppression du produit", error });
  }
};

const updateProduct = async (req: Request, res: Response) => {
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
      { new: true } // Cette option renvoie le produit mis à jour
    );
    if (!product) {
      return res.status(400).json({ message: "Erreur lors de la mise à jour" });
    }
    res.status(200).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du produit", error });
  }
};

export default {
  allProduct,
  productById,
  newProduct,
  deleteProduct,
  updateProduct,
};
