const express = require('express');
const mongoose = require('mongoose');
const OrderController = require('../controllers/OrderController');
const request = require('supertest');



const app = express();
app.use(express.json());
app.use('/orders', OrderController);

// Mock the Order model
jest.mock('../models/OrderModel');

describe('OrderController', () => {
  beforeAll(() => {
    mongoose.connect = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const newOrder = {
        user_id: 'user123',
        items: ['item1', 'item2'],
        totalAmount: 100
      };

      Order.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(newOrder)
      }));

      const response = await request(app)
        .post('/orders')
        .send(newOrder);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newOrder);
    });

    it('should handle errors', async () => {
      Order.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error('Erreur lors de la création de la commande.'))
      }));

      const response = await request(app)
        .post('/orders')
        .send({});

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erreur lors de la création de la commande.' });
    });
  });

  describe('getOrders', () => {
    it('should retrieve all orders', async () => {
      const orders = [{ user_id: 'user123', items: ['item1'], totalAmount: 50 }];

      Order.find.mockResolvedValue(orders);

      const response = await request(app).get('/orders');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(orders);
    });

    it('should handle errors', async () => {
      Order.find.mockRejectedValue(new Error('Erreur lors de la récupération des commandes.'));

      const response = await request(app).get('/orders');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erreur lors de la récupération des commandes.' });
    });
  });

  describe('getOrderById', () => {
    it('should retrieve an order by id', async () => {
      const order = { _id: 'order123', user_id: 'user123', items: ['item1'], totalAmount: 50 };

      Order.findById.mockResolvedValue(order);

      const response = await request(app).get('/orders/order123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(order);
    });

    it('should handle order not found', async () => {
      Order.findById.mockResolvedValue(null);

      const response = await request(app).get('/orders/order123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Commande non trouvée.' });
    });

    it('should handle errors', async () => {
      Order.findById.mockRejectedValue(new Error('Erreur lors de la récupération de la commande.'));

      const response = await request(app).get('/orders/order123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erreur lors de la récupération de la commande.' });
    });
  });

  describe('getOrdersByUser', () => {
    it('should retrieve orders by user id', async () => {
      const orders = [{ user_id: 'user123', items: ['item1'], totalAmount: 50 }];

      Order.find.mockResolvedValue(orders);

      const response = await request(app).get('/orders/user/user123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(orders);
    });

    it('should handle errors', async () => {
      Order.find.mockRejectedValue(new Error('Erreur lors de la récupération des commandes.'));

      const response = await request(app).get('/orders/user/user123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erreur lors de la récupération des commandes.' });
    });
  });

  describe('updateOrderStatus', () => {
    it('should update the status of an order', async () => {
      const order = { _id: 'order123', user_id: 'user123', items: ['item1'], totalAmount: 50, status: 'shipped' };

      Order.findByIdAndUpdate.mockResolvedValue(order);

      const response = await request(app)
        .put('/orders/order123')
        .send({ status: 'shipped' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(order);
    });

    it('should handle order not found', async () => {
      Order.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/orders/order123')
        .send({ status: 'shipped' });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Order not found' });
    });

    it('should handle errors', async () => {
      Order.findByIdAndUpdate.mockRejectedValue(new Error('Internal server error'));

      const response = await request(app)
        .put('/orders/order123')
        .send({ status: 'shipped' });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal server error' });
    });
  });

  describe('cancelOrder', () => {
    it('should cancel an order', async () => {
      const order = { _id: 'order123', user_id: 'user123', items: ['item1'], totalAmount: 50, status: 'cancelled' };

      Order.findById.mockResolvedValue(order);
      order.save = jest.fn().mockResolvedValue(order);

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(order);
    });

    it('should handle order not found', async () => {
      Order.findById.mockResolvedValue(null);

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Commande non trouvée.' });
    });

    it('should handle errors', async () => {
      Order.findById.mockRejectedValue(new Error('Erreur lors de l\'annulation de la commande.'));

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Erreur lors de l\'annulation de la commande.' });
    });
  });

  describe('delOrder', () => {
    it('should delete an order', async () => {
      const order = { _id: 'order123', user_id: 'user123', items: ['item1'], totalAmount: 50 };

      Order.findByIdAndDelete.mockResolvedValue(order);

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Order deleted successfully' });
    });

    it('should handle order not found', async () => {
      Order.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'Order not found' });
    });

    it('should handle errors', async () => {
      Order.findByIdAndDelete.mockRejectedValue(new Error('Internal server error'));

      const response = await request(app).delete('/orders/order123');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: 'Internal server error' });
    });
  });
});