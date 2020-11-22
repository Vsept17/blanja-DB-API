const express = require('express')

const welcomeRouter = express.Router()

welcomeRouter.get("/", (req, res) => {
    res.send("Hello World")
})

module.exports = welcomeRouter;