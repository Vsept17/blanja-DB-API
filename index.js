const express = require('express')

const app = express()
const port = 8000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})

app.get("/", (req, res) => {
    res.send("Acer aws")
})