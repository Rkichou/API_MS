const request = require('supertest');
const port = 3000; // Utiliser le même port que dans jest.setup.ts
const baseUrl = `http://localhost:${port}`;
describe('API Orders', () => {
  // Test de création d'une nouvelle commande
  it('should create a new order', async () => {
    const response = await request(baseUrl)
      .post('/api/orders/create')
      .send({
        userId: "634c8f12f9d0b5420a1a7c1b",
        items: [
            {
            productId: "634c8f53f9d0b5420a1a7c1d",
            quantity: 2,
            price: 19.99
            },
            {
            productId: "634c8f53f9d0b5420a1a7c1e",
            quantity: 1,
            price: 9.99
            }
        ],
        id:1,
        totalAmount: 49.97
            });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('orderId');
  });

  // Test de récupération de toutes les commandes
  it('should get all orders', async () => {
    const response = await request(baseUrl).get('/api/orders');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test de récupération d'une commande par ID
  it('should get an order by ID', async () => {
    const response = await request(baseUrl).get('/api/orders/6720ff7f13feb01ffe4e2b94');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('orderId', '6720ff7f13feb01ffe4e2b94');
  });

  // Test de mise à jour du statut d'une commande
  it('should update the status of an order', async () => {
    const response = await request(baseUrl)
      .put('/api/orders/6720ff7f13feb01ffe4e2b94/status')
      .send({ status: 'shipped' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'shipped');
  });

  // Test d'annulation d'une commande
  it('should cancel an order', async () => {
    const response = await request(baseUrl).delete('/api/orders/6720ff7f13feb01ffe4e2b94');
    expect(response.statusCode).toBe(204);
  });
});
