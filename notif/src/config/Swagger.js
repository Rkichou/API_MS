import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Configuration de Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Notification API",
      description: "API pour envoyer des notifications par email",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3004",
      },
    ],
    components: {
      schemas: {
        Email: {
          type: "object",
          properties: {
            to: {
              type: "string",
              description: "Adresse email du destinataire",
            },
            subject: {
              type: "string",
              description: "Sujet de l'email",
            },
            text: {
              type: "string",
              description: "Contenu de l'email",
            },
          },
          required: ["to", "subject", "text"],
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
