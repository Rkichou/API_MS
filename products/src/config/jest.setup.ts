import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app"; // Assurez-vous que le chemin est correct

let mongoServer: MongoMemoryServer;
let server: any;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  // Démarrer l'application sur un port différent
  const port = 3002; // Utiliser un port différent pour les tests
  server = app.listen(port, () => {
    console.log(`Test server running on port ${port}`);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  if (server) {
    server.close(); // Arrêter le serveur après les tests
  }
});
