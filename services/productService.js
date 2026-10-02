const productDatabase = require("../database/productDatabase");

async function getProducts() {
    return await productDatabase.readData();
}

async function getProductById(id) {
    const products = await productDatabase.readData();
    return products.find(product=>product.id===Number(id))
}

async function addProduct(product) {
    return await productDatabase.addProduct(product);
}

async function updateProduct(id, data) {
    return await productDatabase.updateProduct(id, data);
}

async function deleteProduct(id) {
    return await productDatabase.deleteProduct(id);
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};