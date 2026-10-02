const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const productRoutes = require("./routes/productRoutes");

app.use("/", productRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});