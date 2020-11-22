const express = require('express');

const productsRouter = express.Router();

const productsControllers = require("../controllers/products")

//CREATE
productsRouter.post("/", productsControllers.createProduct);

//READ
productsRouter.get("/", productsControllers.readProduct);

// UPDATE
productsRouter.patch("/", productsControllers.updateProduct);

// DELETE
productsRouter.delete("/:id", productsControllers.deleteProduct);

module.exports = productsRouter;