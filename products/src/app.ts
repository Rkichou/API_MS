import express, { Request, Response } from "express";
import connectDB from "./config/db";
import ProductsRouter from "./routes/RoutesProducts";
import cors from "cors";
import { setupSwagger } from "./config/swagger";

const app = express();
const port = process.env.PORTPRODUCTS || 3002;

// Middleware pour parser le JSON
app.use(cors());
app.use(express.json());
connectDB();

// Configurer Swagger
setupSwagger(app);

// Route simple pour tester l'API
app.use("/products", ProductsRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

export default app;
