const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

//routes
const productRoutes = require('./routes/v1/products.routes');
const brandRoutes = require('./routes/v1/brands.routes');
const categoryRoutes = require('./routes/v1/category.routes');

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brands", brandRoutes);
app.use("/api/v1/category", categoryRoutes);

module.exports = app;