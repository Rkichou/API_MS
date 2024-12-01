// controllers/ApiGatewayController.js
import axios from "axios";

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

export const handleUsersRequest = (req, res) => {
  proxyRequest(req, res, "http://user-service:3001");
};

export const handleOrdersRequest = (req, res) => {
  proxyRequest(req, res, "http://order-service:3000");
};

export const handleProductsRequest = (req, res) => {
  proxyRequest(req, res, "http://products-service:3002");
};

export const handleCheckoutRequest = (req, res) => {
  proxyRequest(req, res, "http://cart_service:3003");
};