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

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/brands", brandRoutes);

module.exports = app;