import request from 'supertest';
import User from '../models/UserModel';
import { hashPassword } from '../services/UserService';

const port = 3002; // Utiliser le même port que dans jest.setup.ts
const baseUrl = `http://localhost:${port}`;

describe('POST /users/login', () => {
  beforeAll(async () => {
    // Créer un utilisateur de test
    const hashedPassword = await hashPassword('password123');
    await User.create({ email: 'test@example.com', password: hashedPassword, role: true });
  });

  afterAll(async () => {
    // Supprimer les utilisateurs de test
    await User.deleteMany({});
  });

  it('should login a user and return a token', async () => {
    const res = await request(baseUrl)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should return 400 for invalid credentials', async () => {
    const res = await request(baseUrl)
      .post('/users/login')
      .send({
        email: 'test@example.com',
        password: 'wrongpassword',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'Email ou mot de passe incorrect.');
  });
});