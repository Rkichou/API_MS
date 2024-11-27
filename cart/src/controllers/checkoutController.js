const stripe = require('stripe')('sk_test_51QFG6SRsLyr6WwcbLgwLURohiRZbgq0AJv35ZSmnxJoxbQFfWCKs63inmXKYv2T7lsolsyWaZntAodF9spCevW2a00dUlVFAlF'); // Remplacez par votre clé secrète Stripe

// Fonction pour créer une session de checkout Stripe
exports.createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body; // Items devrait être un tableau avec les objets des articles (id, nom, prix, quantité)
    
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd', // Devise
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe utilise des centimes
      },
      quantity: item.quantity,
    }));

    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3003/success', // URL de succès
      cancel_url: 'http://localhost:3003/cancel',   // URL d'annulation
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Erreur lors de la création de la session de checkout :', error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de la session de checkout.' });
  }
};
