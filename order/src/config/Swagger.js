import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce",
      version: "1.0.0",
      description: "API documentation for the ecommerce project",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        Order: {
          type: "object",
          properties: {
            user_id: {
              type: "string",
              description: "ID of the user who placed the order",
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: {
                    type: "string",
                    description: "ID of the product",
                  },
                  quantity: {
                    type: "integer",
                    description: "Quantity of the product ordered",
                  },

                  price: {
                    type: "number",
                    description: "Price of the product at the time of order",
                  },
                },
              },
              description: "List of items in the order",
            },
            totalAmount: {
              type: "number",
              description: "Total amount of the order",
            },
            status: {
              type: "string",
              description: "Current status of the order",
              enum: ["pending", "completed", "shipped", "cancelled"],
            },
            trackingNumber: {
              type: "string",
              description: "Unique tracking number for the order",
            },

            createdAt: {
              type: "string",
              format: "date-time",
              description: "Date and time when the order was created",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Date and time when the order was last updated",
            },
          },
          required: ["user_id", "items", "totalAmount", "status"],
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      "/api/orders/create": {
        post: {
          summary: "Create a new order",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Order" },
              },
            },
          },
          responses: {
            201: {
              description: "Order created successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            400: { description: "Bad request" },
          },
        },
      },
      "/api/orders/": {
        get: {
          summary: "retrieve orders",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],

          responses: {
            201: {
              description: "Order retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            400: { description: "Bad request" },
          },
        },
      },
      "/api/orders/{id}": {
        get: {
          summary: "Get a specific order by ID",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Order ID",
            },
          ],
          responses: {
            200: {
              description: "Order retrieved successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Order" },
                },
              },
            },
            404: { description: "Order not found" },
          },
        },
        delete: {
          summary: "Cancel an order by ID",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Order ID",
            },
          ],
          responses: {
            200: { description: "Order cancelled successfully" },
            404: { description: "Order not found" },
          },
        },
      },
      "/api/orders/user/{user_id}": {
        get: {
          summary: "Get all orders by user ID",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "user_id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "User ID",
            },
          ],
          responses: {
            200: {
              description: "List of user orders retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/Order" },
                  },
                },
              },
            },
          },
        },
      },
      "/api/orders/{id}/status": {
        put: {
          summary: "Update the status of an order",
          tags: ["Orders"],
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
              description: "Order ID",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      enum: ["pending", "completed", "shipped", "cancelled"],
                      description: "New status for the order",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Order status updated successfully" },
            400: { description: "Invalid status value" },
            404: { description: "Order not found" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // console.log('Swagger docs available at /api-docs');
};
