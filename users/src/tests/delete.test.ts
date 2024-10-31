import request from 'supertest';
import User from '../models/UserModel';
import jwt from 'jsonwebtoken';

const port = 3002; // Utiliser le même port que dans jest.setup.ts
const baseUrl = `http://localhost:${port}`;

describe('POST /users/delete', () => {
  let token: string;
  let userId: string;

  beforeAll(async () => {
    // Créer un utilisateur de test
    const user = await User.create({ email: 'deleteuser@example.com', password: 'password123', role: true });
    userId = user._id.toString();
    token = jwt.sign({ id: userId, role: true }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });
  });

  afterAll(async () => {
    // Supprimer l'utilisateur de test
    await User.deleteMany({});
  });

  it('should delete a user and return success message', async () => {
    const res = await request(baseUrl)
      .post('/users/delete')
      .set('Authorization', `${token}`) // Assurez-vous que le token est correctement formaté
      .send({
        _id: userId,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('msg', 'Utilisateur supprimé avec succès.');
  });

  it('should return 401 for missing token', async () => {
    const res = await request(baseUrl)
      .post('/users/delete')
      .send({
        _id: userId,
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('msg', 'Accès refusé. Aucun token fourni.');
  });

  it('should return 400 for invalid user ID', async () => {
    const res = await request(baseUrl)
      .post('/users/delete')
      .set('Authorization', `${token}`) // Assurez-vous que le token est correctement formaté
      .send({
        _id: 'invalidUserId',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('msg', 'ID utilisateur invalide.');
  });
});