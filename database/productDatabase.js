const fs = require("fs/promises");
const path = require("path");

const filepath = path.join(__dirname, "..", "db.json");

async function readData() {
    const data = await fs.readFile(filepath, "utf-8");

    return JSON.parse(data);
}

module.exports = {
    readData
};