const productService = require("../services/productService");
const { clearCache } = require("../middleware/cacheMiddleware");


async function getProducts(req, res) {
    try {
        const products = await productService.getProducts();

        return res.json(products);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function getProductById(req, res) {
    try {
        const product = await productService.getProductById(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.json(product);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function addProduct(req, res) {
    try {
        const product = await productService.addProduct(req.body);

        // Database changed → clear cache
        await clearCache();

        return res.status(201).json(product);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function updateProduct(req, res) {
    try {
        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Database changed → clear cache
        await clearCache();

        return res.json(product);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const product = await productService.deleteProduct(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        // Database changed → clear cache
        await clearCache();

        return res.json(product);
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};