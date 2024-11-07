import express from "express";
import dotenv from "dotenv";
import OrderRoutes from "./routes/OrderRoutes.js";
import { setupSwagger } from "./config/Swagger.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
setupSwagger(app);
app.use(express.json());

// Routes
app.use("/orders", OrderRoutes);

// Connect to the database and start the server
const startServer = async () => {
  try {
    await connectDB(); // Connectez-vous à la base de données
    app.listen(PORT, () => {
      console.log(`Order service running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
