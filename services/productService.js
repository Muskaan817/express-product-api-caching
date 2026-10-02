const productDatabase = require("../database/productDatabase");

async function getProducts() {
    return await productDatabase.readData();
}

async function getProductById(id) {
    const products = await productDatabase.readData();
    return products.find(product=>product.id===Number(id))
}

module.exports = {
    getProducts,
    getProductById
};