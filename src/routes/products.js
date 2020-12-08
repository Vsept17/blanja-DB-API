const express = require('express');

const productsRouter = express.Router();

const productsControllers = require("../controllers/products")
const checkToken = require("../helpers/middleware/checkToken")

//CREATE
productsRouter.post("/", checkToken, productsControllers.createProduct);

//READ
productsRouter.get("/allproducts", productsControllers.readProduct);

//READ PAGINATION
productsRouter.get("/", productsControllers.readProductPagination);

// UPDATE
productsRouter.patch("/", productsControllers.updateProduct);

// DELETE
productsRouter.delete("/:id",  productsControllers.deleteProduct);

//READ by ID
productsRouter.get("/:id", checkToken, productsControllers.readSingleProduct);

module.exports = productsRouter;
