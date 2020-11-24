const express = require("express");

const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const productsRouter = require("./products");
const historyRouter = require("./history");
const productSortRouter = require("./product-sort");
const searchRouter = require("./search");


mainRouter.use("/", welcomeRouter); // Done flowcart

//Route CRUD
mainRouter.use("/products", productsRouter); // Done flowcart

//Route History
mainRouter.use("/history", historyRouter); // Done flowcart

//Route Sorting
mainRouter.use("/products/sort", productSortRouter);// Done Flowchart

//Route Search
mainRouter.use("/products/search", searchRouter); // Done flowcart

module.exports = mainRouter