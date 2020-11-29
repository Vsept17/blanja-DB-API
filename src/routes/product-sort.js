const express = require('express')

const productSortRouter = express.Router();

const productSortControllers = require("../controllers/product-sort")

productSortRouter.get("/", productSortControllers.sortBy)

module.exports = productSortRouter