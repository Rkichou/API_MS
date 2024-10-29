import request from 'supertest';
import User from '../models/UserModel';

const port = 3002; // Utiliser le même port que dans jest.setup.ts
const baseUrl = `http://localhost:${port}`;

describe('POST /users/register', () => {
  afterAll(async () => {
    // Supprimer les utilisateurs de test
    await User.deleteMany({});
  });

  it('should register a new user and return a token', async () => {
    const res = await request(baseUrl)
      .post('/users/register')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        isAdmin: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 400 for existing email', async () => {
    await User.create({ email: 'existinguser@example.com', password: 'password123', role: true });

    const res = await request(baseUrl)
      .post('/users/register')
      .send({
        email: 'existinguser@example.com',
        password: 'password123',
        isAdmin: true,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'Cet email est déjà utilisé.');
  });
});