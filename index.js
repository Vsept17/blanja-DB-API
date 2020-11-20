const express = require('express')
const mySQL = require("mysql")
const logger =require("morgan")

const app = express()
const port = 8000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})

app.use(logger("dev"))

app.get("/", (req, res) => {
    res.send("Hello World")
})

const db = mySQL.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blanja_db",
})

db.connect(err => {
    if (err) throw err;
    console.log("Database Connected")
})

app.get("/products", (req, res) => {
    const getProducts = new Promise((resolve, reject) => {
        const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name FROM products AS p join category on category.id = p.product_category"

        db.query(queryString, (err, data) => {
            if(!err) {
                resolve(data);
            } else {
                reject(err)
            }
        })
    });
    getProducts.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
})

app.post("/products", (req, res) => {
    
})