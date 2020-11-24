const express = require('express')

const productSortRouter = express.Router();

const productSortControllers = require("../controllers/product-sort")

// Sort By Name
productSortRouter.get("/by-name", productSortControllers.sortByNameProduct)

// Sort By Update
productSortRouter.get("/by-update", productSortControllers.sortByUpdateProduct)

// Sort By Price
productSortRouter.get("/by-price", productSortControllers.sortByPriceProduct)

module.exports = productSortRouter