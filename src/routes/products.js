const express = require('express');

const productsRouter = express.Router();

const productsControllers = require("../controllers/products")

//CREATE
productsRouter.post("/create-product", productsControllers.createProduct);

//READ
productsRouter.get("/", productsControllers.readProduct);

// UPDATE
productsRouter.patch("/update-product", productsControllers.updateProduct);

// DELETE
productsRouter.delete("/delete-product-:id", productsControllers.deleteProduct);

module.exports = productsRouter;
