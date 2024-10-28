import { Request, Response } from "express";
import User from "../models/UserModel";
import { hashPassword } from "../services/UserService";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Login Controller
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authentification d'un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Email ou mot de passe incorrect
 *       500:
 *         description: Erreur interne du serveur
 */
const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ msg: "Email ou mot de passe incorrect." });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ msg: "Email ou mot de passe incorrect." });
      return;
    }
    const payload = {
      id: user._id,
      role: user.role || 1,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h", // Le jeton expire après 1 heure
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur interne du serveur." });
  }
};

// Register Controller
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Enregistrement d'un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Cet email est déjà utilisé
 *       500:
 *         description: Erreur interne du serveur
 */
const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, isAdmin } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ msg: "Cet email est déjà utilisé." });
      return;
    }

    // Hacher le mot de passe
    const hashedPassword = await hashPassword(password);

    // Créer un nouvel utilisateur
    const newUser = new User({
      email,
      password: hashedPassword,
      role: isAdmin ? true : false, // Si isAdmin est true, créer un admin
    });

    console.log("saving user", newUser);
    await newUser.save();

    // Récupérer l'utilisateur nouvellement créé pour obtenir l'ID
    const user = await User.findOne({ email });

    // Créer le token
    console.log("creating token");
    if (!user) {
      res
        .status(500)
        .json({ msg: "Erreur lors de la récupération de l'utilisateur." });
      return;
    }
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
      expiresIn: "1h", // Le jeton expire après 1 heure
    });
    console.log("token created", token);

    res
      .status(200)
      .json({ msg: "Utilisateur créé avec succès.", token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Erreur interne du serveur." });
  }
};

// Delete Controller
/**
 * @swagger
 * /delete:
 *   post:
 *     summary: Suppression d'un utilisateur
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     role:
 *                       type: boolean
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
const del = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.body;

  if (!_id) {
    res.status(400).json({ msg: "ID de l'utilisateur requis." });
    return;
  }

  try {
    // Étape 1: Récupérer l'utilisateur
    const user = await User.findOne({ _id: _id as string });

    // Vérifier si l'utilisateur existe
    if (!user) {
      res.status(404).json({ msg: "Utilisateur non trouvé." });
      return;
    }

    // Étape 2: Supprimer l'utilisateur une fois récupéré
    await user.deleteOne(); // Utilisation de la méthode 'deleteOne' pour supprimer l'utilisateur récupéré

    // Réponse de succès
    res.status(200).json({ msg: "Utilisateur supprimé avec succès.", user });
  } catch (error) {
    // Gestion des erreurs
    console.error(error);
    res.status(500).json({ msg: "Erreur interne du serveur." });
  }
};

export default { login, register, del };