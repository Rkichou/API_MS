const express = require("express");
const connectDB = require("../src/config/db");
const swaggerDocs = require("../src/config/Swagger");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const cors = require("cors");

const app = express();
swaggerDocs(app);

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", cartRoutes);
app.use("/", checkoutRoutes);
// Démarrer le serveur
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    "Swagger documentation available at http://localhost:3003/api-docs"
  );
});

module.exports = app;
