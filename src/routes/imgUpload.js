const imgUploadRouter = require("express").Router();

const singleUpload = require("../helpers/middleware/upload");

imgUploadRouter.post("/", singleUpload, (req, res) => {
    const filePath = "/images/" + req.file.filename;
    res.json({
        filePath
    })
})

module.exports = imgUploadRouter;