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

app.use("/api/v1/products", productRoutes);

module.exports = app;