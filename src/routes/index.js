const express = require("express");

const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const productsRouter = require("./products");
const historyRouter = require("./history");
const productSortRouter = require("./product-sort");
const searchRouter = require("./search");


mainRouter.use("/", welcomeRouter);

//Route CRUD
mainRouter.use("/products", productsRouter);
mainRouter.use("/products/create-product", productsRouter);
mainRouter.use("/products/update-product", productsRouter);
mainRouter.use("/products/delete-product", productsRouter);

//Route History
mainRouter.use("/history", historyRouter);

//Route Sorting
mainRouter.use("/products/sort-by-name-asc", productSortRouter);
mainRouter.use("/products/sort-by-update-asc", productSortRouter);
mainRouter.use("/products/sort-by-price-asc", productSortRouter);

//Route Search
mainRouter.use("/products/search", searchRouter);

module.exports = mainRouter