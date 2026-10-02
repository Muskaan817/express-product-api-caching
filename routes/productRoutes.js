const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const { cacheMiddleware } = require("../middleware/cacheMiddleware");

router.get(
    "/products",
    cacheMiddleware,
    productController.getProducts
);

router.get(
    "/products/:id",
    cacheMiddleware,
    productController.getProductById
);

module.exports = router;