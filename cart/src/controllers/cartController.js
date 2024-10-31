const Cart = require('../models/Cart');

// Fonction pour ajouter un produit au panier
exports.addItemToCart = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        // Rechercher le panier de l'utilisateur
        let cart = await Cart.findOne({ user_id });

        // Si le panier n'existe pas, créer un nouveau panier pour cet utilisateur
        if (!cart) {
            cart = new Cart({
                user_id,
                items: [{ product_id, quantity }]
            });
        } else {
            // Si le panier existe, vérifier si le produit est déjà dans le panier
            const itemIndex = cart.items.findIndex(item => item.product_id === product_id);

            if (itemIndex > -1) {
                // Si le produit est déjà dans le panier, mettre à jour la quantité
                cart.items[itemIndex].quantity += quantity;
            } else {
                // Sinon, ajouter le produit au panier
                cart.items.push({ product_id, quantity });
            }
        }

        // Sauvegarder le panier mis à jour ou nouvellement créé dans la base de données
        await cart.save();
        res.status(200).json({ success: true, message: 'Produit ajouté au panier', cart });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction pour supprimer un produit du panier
exports.removeItemFromCart = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: 'Panier non trouvé' });

        // Filtrer pour supprimer l'élément
        cart.items = cart.items.filter(item => item.product_id !== product_id);

        await cart.save();
        res.status(200).json({ success: true, message: 'Produit supprimé du panier' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction pour vider complètement le panier
exports.clearCart = async (req, res) => {
    const { user_id } = req.params;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: 'Panier non trouvé' });

        // Vider les items du panier
        cart.items = [];
        await cart.save();
        res.status(200).json({ success: true, message: 'Panier vidé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction pour mettre à jour la quantité d'un produit dans le panier
exports.updateItemQuantity = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: 'Panier non trouvé' });

        // Trouver l'élément dans le panier et mettre à jour la quantité
        const itemIndex = cart.items.findIndex(item => item.product_id === product_id);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ success: true, message: 'Quantité mise à jour', cart });
        } else {
            res.status(404).json({ success: false, message: 'Produit non trouvé dans le panier' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction pour récupérer le panier d'un utilisateur
exports.getCart = async (req, res) => {
    const { user_id } = req.params;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: 'Panier non trouvé'+user_id });

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// Fonction pour récupérer tous les paniers
exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        console.log(carts);

        res.status(200).json({ success: true, carts });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
