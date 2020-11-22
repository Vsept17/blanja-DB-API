const express = require('express')

const productSortRouter = express.Router();

const productSortControllers = require("../controllers/product-sort")

// Sort By Name
productSortRouter.get("/", productSortControllers.sortByNameProduct)

// Sort By Update
productSortRouter.get("/", productSortControllers.sortByUpdateProduct)

// Sort By Price
productSortRouter.get("/", productSortControllers.sortByPriceProduct)

module.exports = productSortRouter