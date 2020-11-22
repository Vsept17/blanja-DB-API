const express = require('express')
const logger =require("morgan")

const mainRouter = require("./src/routes/index")

const app = express()
const port = 8000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})

app.use(logger("dev"))
// tambah parser untuk www.form-urlencoded (postman)
app.use(express.urlencoded({extended: false}))

app.use("/", mainRouter)

module.exports = app;