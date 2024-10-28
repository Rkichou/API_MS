// src/models/OrderModel.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; 
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'shipped', 'cancelled'],
    default: 'pending',
  },
  trackingNumber: {
    type: String,
    default: () => uuidv4(), // Génère un UUID unique comme numéro de suivi
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema); // Utilisez `export default`
