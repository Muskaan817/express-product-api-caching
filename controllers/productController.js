const productService = require("../services/productService");

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
        const product = await productService.getProductById(req.params.id);

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

module.exports = {
    getProducts,
    getProductById
};