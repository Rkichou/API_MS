const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  items: [
    {
      product_id: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true },
      name: { type: String },
      image: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);