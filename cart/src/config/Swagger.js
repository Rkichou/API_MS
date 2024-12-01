const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cart API',
      description: 'API pour gérer le panier des utilisateurs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3003/api',
      },
    ],
    components: {
      schemas: {
        Cart: {
          type: 'object',
          properties: {
            user_id: {
              type: 'string',
              description: 'Identifiant de l’utilisateur',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  product_id: {
                    type: 'string',
                    description: 'Identifiant du produit',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Quantité du produit',
                    minimum: 1,
                  },
                },
              },
            },
          },
          required: ['user_id', 'items'],
        },
      },
    },
    paths: {
      '/cart/add': {
        post: {
          summary: 'Ajouter un produit au panier',
          description: 'Ajoute un produit dans le panier d’un utilisateur.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user_id: { type: 'string' },
                    product_id: { type: 'string' },
                    quantity: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Produit ajouté au panier avec succès.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                      cart: { $ref: '#/components/schemas/Cart' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Erreur serveur',
            },
          },
        },
      },
      '/cart/remove': {
        delete: {
          summary: 'Supprimer un produit du panier',
          description: 'Supprime un produit spécifique du panier d’un utilisateur.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user_id: { type: 'string' },
                    product_id: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Produit supprimé du panier avec succès.' },
            '404': { description: 'Panier non trouvé' },
            '500': { description: 'Erreur serveur' },
          },
        },
      },
      '/cart/update': {
        put: {
          summary: 'Mettre à jour la quantité d’un produit dans le panier',
          description: 'Met à jour la quantité d’un produit existant dans le panier d’un utilisateur.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    user_id: { type: 'string' },
                    product_id: { type: 'string' },
                    quantity: { type: 'integer' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Quantité mise à jour avec succès.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                      cart: { $ref: '#/components/schemas/Cart' },
                    },
                  },
                },
              },
            },
            '404': { description: 'Panier ou produit non trouvé' },
            '500': { description: 'Erreur serveur' },
          },
        },
      },
      '/cart/user/{user_id}': {
        get: {
          summary: 'Récupérer le panier d’un utilisateur spécifique',
          description: 'Récupère tous les articles dans le panier d’un utilisateur spécifique.',
          parameters: [
            {
              in: 'path',
              name: 'user_id',
              required: true,
              schema: { type: 'string' },
              description: 'L’identifiant de l’utilisateur',
            },
          ],
          responses: {
            '200': {
              description: 'Panier récupéré avec succès.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      cart: { $ref: '#/components/schemas/Cart' },
                    },
                  },
                },
              },
            },
            '404': { description: 'Panier non trouvé' },
            '500': { description: 'Erreur serveur' },
          },
        },
      },
      '/cart/clear/{user_id}': {
        delete: {
          summary: 'Vider complètement le panier d’un utilisateur',
          description: 'Supprime tous les produits du panier d’un utilisateur.',
          parameters: [
            {
              in: 'path',
              name: 'user_id',
              required: true,
              schema: { type: 'string' },
              description: 'L’identifiant de l’utilisateur',
            },
          ],
          responses: {
            '200': { description: 'Panier vidé avec succès.' },
            '404': { description: 'Panier non trouvé' },
            '500': { description: 'Erreur serveur' },
          },
        },
      },
      '/cart/all': {
        get: {
          summary: 'Récupérer tous les paniers',
          description: 'Récupère les paniers de tous les utilisateurs.',
          responses: {
            '200': {
              description: 'Tous les paniers récupérés avec succès.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      carts: {
                        type: 'array',
                        items: { $ref: '#/components/schemas/Cart' },
                      },
                    },
                  },
                },
              },
            },
            '500': { description: 'Erreur serveur' },
          },
        },
      },
    },
  },
  apis: [], // Pas besoin de fichiers externes ici
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
