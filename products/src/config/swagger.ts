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
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "Documentation de l'API pour le projet Ecommerce",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur local",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: [
            "name",
            "price",
            "description",
            "disponibilite",
            "categorie",
          ],
          properties: {
            user_id: {
              type: "string",
              description: "L'ID de l'utilisateur ajoutant le produit",
            },
            name: {
              type: "string",
              description: "Nom du produit",
            },
            price: {
              type: "number",
              description: "Prix du produit",
            },
            description: {
              type: "string",
              description: "Description du produit",
            },
            disponibilite: {
              type: "boolean",
              description: "Disponibilité du produit",
            },
            categorie: {
              type: "string",
              description: "Catégorie du produit",
            },
          },
        },
      },
    },
    paths: {
      "/products": {
        get: {
          summary: "Récupère tous les produits",
          tags: ["Products"],
          responses: {
            200: {
              description: "Liste de produits récupérée avec succès",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/Product",
                    },
                  },
                },
              },
            },
            500: { description: "Erreur lors de la récupération des produits" },
          },
        },
        post: {
          summary: "Crée un nouveau produit",
          tags: ["Products"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          responses: {
            201: { description: "Produit créé avec succès" },
            500: { description: "Erreur lors de la création du produit" },
          },
        },
      },
      "/products/{id}": {
        get: {
          summary: "Récupère un produit par ID",
          tags: ["Products"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID du produit",
            },
          ],
          responses: {
            200: {
              description: "Produit récupéré avec succès",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Product" },
                },
              },
            },
            400: { description: "Produit non trouvé" },
            500: { description: "Erreur lors de la récupération du produit" },
          },
        },
        delete: {
          summary: "Supprime un produit par ID",
          tags: ["Products"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID du produit",
            },
          ],
          responses: {
            204: { description: "Produit supprimé avec succès" },
            400: { description: "Produit non trouvé" },
            500: { description: "Erreur lors de la suppression du produit" },
          },
        },
        put: {
          summary: "Met à jour un produit par ID",
          tags: ["Products"],
          parameters: [
            {
              in: "path",
              name: "id",
              schema: { type: "string" },
              required: true,
              description: "ID du produit",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Product" },
              },
            },
          },
          responses: {
            200: { description: "Produit mis à jour avec succès" },
            400: { description: "Produit non trouvé" },
            500: { description: "Erreur lors de la mise à jour du produit" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("Swagger docs disponibles à /api-docs");
};
