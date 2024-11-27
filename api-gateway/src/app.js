// app.js
import express, { json } from "express";
import cors from "cors";
import setupSwagger from "./config/Swagger.js";

import {
  handleUsersRequest,
  handleOrdersRequest,
  handleProductsRequest,
  handleCartRequest,
} from "./controllers/ApiGatewayController.js";

const app = express();
const PORT = process.env.PORTGATEWAY || 3005;

// Middleware pour parser le JSON
app.use(cors());
app.use(express.json());

setupSwagger(app);

// Routes vers les microservices
app.use("/users", handleUsersRequest);
app.use("/orders", handleOrdersRequest);
app.use("/products", handleProductsRequest);
app.use("/cart", handleCartRequest);
app.use("/", (req, res) => {
  res.send("API Gateway");
});
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
