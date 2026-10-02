const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const {
    cacheMiddleware
} = require("../middleware/cacheMiddleware");


// GET all products
router.get(
    "/products",
    cacheMiddleware,
    productController.getProducts
);


// GET one product
router.get(
    "/products/:id",
    cacheMiddleware,
    productController.getProductById
);


// CREATE
router.post(
    "/products",
    productController.addProduct
);


// UPDATE
router.put(
    "/products/:id",
    productController.updateProduct
);


// PARTIAL UPDATE
router.patch(
    "/products/:id",
    productController.updateProduct
);


// DELETE
router.delete(
    "/products/:id",
    productController.deleteProduct
);


module.exports = router;