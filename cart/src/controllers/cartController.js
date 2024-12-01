const Cart = require('../models/Cart');

exports.addItemToCart = async (req, res) => {
    const { user_id, product_id, quantity, price, name, image } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({
                user_id,
                items: [{ product_id, quantity, price, name, image }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.product_id === product_id);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({ product_id, quantity, price, name, image });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, message: 'Product added to cart', cart: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

exports.removeItemFromCart = async (req, res) => {
    const { user_id, product_id } = req.body;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.product_id !== product_id);

        await cart.save();
        res.status(200).json({ success: true, message: 'Product removed from cart', cart: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

exports.clearCart = async (req, res) => {
    const { user_id } = req.params;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        cart.items = [];
        await cart.save();
        res.status(200).json({ success: true, message: 'Cart cleared', cart: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

exports.updateItemQuantity = async (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

        const itemIndex = cart.items.findIndex(item => item.product_id === product_id);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
            await cart.save();
            res.status(200).json({ success: true, message: 'Quantity updated', cart: cart });
        } else {
            res.status(404).json({ success: false, message: 'Product not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

exports.getCart = async (req, res) => {
    const { user_id } = req.params;
    try {
        let cart = await Cart.findOne({ user_id });
        if (!cart) {
            cart = new Cart({
                user_id,
                items: []
            });
            await cart.save();
        }

        res.status(200).json({ success: true, cart: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

exports.getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json({ success: true, carts: carts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};