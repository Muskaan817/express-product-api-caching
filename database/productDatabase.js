const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(__dirname, "..", "db.json");

async function readData() {
    const data = await fs.readFile(filepath, "utf-8");
    return JSON.parse(data);
}

async function addProduct(product) {
    const products = await readData();
    const newProduct = {
        id: products.length + 1,
        ...product
    };
    products.push(newProduct);
    await fs.writeFile(
        filepath,
        JSON.stringify(products, null, 2)
    );
    return newProduct;
}

async function updateProduct(id, data) {
    const products = await readData();
    const product = products.find(
        (product) => product.id === Number(id)
    );
    if (!product) {
        return null;
    }
    Object.assign(product, data);
    await fs.writeFile(
        filepath,
        JSON.stringify(products, null, 2)
    );
    return product;
}

async function deleteProduct(id) {
    const products = await readData();

    const index = products.findIndex(
        (product) => product.id === Number(id)
    );
    if (index === -1) {
        return null;
    }
    const deletedProduct = products.splice(index, 1)[0];
    await fs.writeFile(
        filepath,
        JSON.stringify(products, null, 2)
    );
    return deletedProduct;
}

module.exports = {
    readData,
    addProduct,
    updateProduct,
    deleteProduct
};