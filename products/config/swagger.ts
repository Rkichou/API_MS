import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Produits",
      version: "1.0.0",
      description: "Documentation de l'API pour gérer les produits",
    },
    servers: [
      {
        url: "http://localhost:3002",
      },
    ],
  },
  apis: ["./routes/*.ts"], // Indiquez le chemin vers vos fichiers avec les annotations Swagger
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3002, () =>
  console.log("Serveur en cours d'exécution sur http://localhost:3002")
);
