// controllers/ApiGatewayController.js
import axios from "axios";

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Proxy request to users service
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
export const handleUsersRequest = (req, res) => {
  proxyRequest(req, res, "http://user-service:3001");
};

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Proxy request to orders service
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
export const handleOrdersRequest = (req, res) => {
  proxyRequest(req, res, "http://order-service:3000");
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Proxy request to products service
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
export const handleProductsRequest = (req, res) => {
  proxyRequest(req, res, "http://products-service:3002");
};

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Proxy request to cart service
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
export const handleCartRequest = (req, res) => {
  proxyRequest(req, res, "http://cart_service:3003");
};

const proxyRequest = async (req, res, targetUrl) => {
  try {
    const response = await axios({
      method: req.method,
      url: `${targetUrl}${req.originalUrl}`,
      data: req.body,
      headers: {
        Authorization: req.header("Authorization"),
        "Content-Type": req.header("Content-Type"),
      },
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      message: error.message,
    });
  }
};
