const multiImgUploadRouter = require("express").Router();

const multiUpload = require("../helpers/middleware/multiUpload");


multiImgUploadRouter.post("/", multiUpload)

module.exports = multiImgUploadRouter;