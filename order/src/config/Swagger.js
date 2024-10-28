import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
definition: {
    openapi: '3.0.0',
    info: {
    title: 'Ecommerce',
    version: '1.0.0',
    description: 'API documentation for the ecommerce project',
    },
    servers: [
    {
        url: 'http://localhost:3000',
        description: 'Local server',
    },
    ],
    components: {
    schemas: {
        Order: {
            type: 'object',
            properties: {
            userId: {
                type: 'string',
                description: "ID of the user who placed the order",
            },
            items: {
                type: 'array',
                items: {
                type: 'object',
                properties: {
                    productId: {
                    type: 'string',
                    description: 'ID of the product',
                    },
                    quantity: {
                    type: 'integer',
                    description: 'Quantity of the product ordered',
                    },
                    price: {
                    type: 'number',
                    description: 'Price of the product at the time of order',
                    },
                },
                },
                description: 'List of items in the order',
            },
            totalAmount: {
                type: 'number',
                description: 'Total amount of the order',
            },
            status: {
                type: 'string',
                description: 'Current status of the order',
                enum: ['pending', 'completed', 'shipped', 'cancelled'],
            },
            createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the order was created',
            },
            updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'Date and time when the order was last updated',
            },
            },
            required: ['userId', 'items', 'totalAmount', 'status'],
        },
        },
        securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
        },
    },
    },
    security: [
    {
        bearerAuth: [],
    },
    ],
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Files containing annotations
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // console.log('Swagger docs available at /api-docs');
};