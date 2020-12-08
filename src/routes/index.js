const express = require("express");

const mainRouter = express.Router();

const welcomeRouter = require("./welcome");
const productsRouter = require("./products");
const historyRouter = require("./history");
const productSortRouter = require("./product-sort");
const searchRouter = require("./search");
const authRouter = require("./auth");
const imgUploadRouter = require("./imgUpload")
const multiImgUploadRouter = require("./multiImgUpload")
const checkToken = require("../helpers/middleware/checkToken")


mainRouter.use("/", welcomeRouter);

//Route CRUD
mainRouter.use("/product", checkToken, productsRouter);

//Route History
mainRouter.use("/history",  historyRouter); 

//Route Sorting
mainRouter.use("/sort", productSortRouter);

//Route Search
mainRouter.use("/search", searchRouter);

mainRouter.use("/auth", authRouter);

mainRouter.use("/upload", imgUploadRouter);

mainRouter.use("/multi-upload", multiImgUploadRouter);

module.exports = mainRouter