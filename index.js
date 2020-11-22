const express = require('express')
const mySQL = require("mysql")
const logger =require("morgan")

const app = express()
const port = 8000;

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})

app.use(logger("dev"))
// tambah parser untuk www.form-urlencoded (postman)
app.use(express.urlencoded({extended: false}))

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

//READ
app.get("/products", (req, res) => {
    const getProducts = new Promise((resolve, reject) => {
        const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY id ASC"

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

//CREATE
app.post("/products", (req, res) => {
    const { body } = req;
    const addNewProduct = new Promise ((resolve, reject) => {
        const postQUeryString = "INSERT INTO products SET ?"
        db.query(postQUeryString, body, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    addNewProduct.then((data) => {
        const successCreate = {
            msg: "Data berhasil ditambahkan"
        }
        res.json(successCreate)
    })
    .catch((err) => {
        const error = {
            msg: "Data gagal ditambahkan",
            err
        }
        res.json(error)
    })
})

// UPDATE
app.patch("/products/update-product", (req, res) =>{
    const { id } = req.body
    const { body } = req;
    const updateBody = {...body, 
        updated_at: new Date(Date.now()) }
    const idBody = { id }
    const updateProduct = new Promise ((resolve, reject) => {
        const queryStr = "UPDATE products SET ? WHERE ?"
        db.query(queryStr, [updateBody, idBody], (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    updateProduct
    .then((data) => {
        const successUpdate = {
            msg: "Data berhasil di update",
            data: {
                id: data.updateId, updateBody
            },
        }
        res.json(successUpdate)
    })
    .catch((err) => {
        const error = {
            msg: "Data gagal diupdate",
            err
        }
        res.json(error)
    })
})

// DELETE
app.delete("/products/delete-product/:id", (req, res) => {
    const { id } = req.params;
    const deleteProduct = new Promise ((resolve, reject) => {
        const postQUeryString = "DELETE FROM products WHERE id = ?"
        db.query(postQUeryString, id, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    deleteProduct.then((data) => {
        const successDelete = {
            msg: "Data berhasil dihapus"
        }
            res.json(successDelete)
    })
    .catch((err) => {
        res.json(err)
    })
})

// Sort By Name
app.get("/products/sort-by-name-asc", (req, res) => {
    const getProducts = new Promise((resolve, reject) => {
        const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate FROM products AS p join category on category.id = p.product_category ORDER BY product_name ASC"

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

// Sort By Update
app.get("/products/sort-by-update-asc", (req, res) => {
    const getProducts = new Promise((resolve, reject) => {
        const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY updated_at ASC"

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

// Sort By Price
app.get("/products/sort-by-price-asc", (req, res) => {
    const getProducts = new Promise((resolve, reject) => {
        const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY product_price ASC"

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

// Search
app.get("/search", (req, res) => {
    const { q } = req.query;
    const keyword = "%" + q + "%"
    const searchProduct = new Promise ((resolve, reject) => {
        const querySearch = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p JOIN category ON category.id = p.product_category WHERE product_name LIKE ?";
        db.query(querySearch, keyword, (err, data) => {
            if(!err) {
                resolve(data);
            } else {
                reject(err)
            }
        })
    })
    searchProduct.then((data) => {
        res.json(data);
    })
    .catch((err) => {
        const errorSearch = {
            msg: "Data tidak ditemukan",
            err
        }
        res.json(errorSearch)
    })
})

// TABEL HISTORY
app.post("/history", (req, res) => {
    const { body } = req;
    const addNewProduct = new Promise ((resolve, reject) => {
        const postQUeryString = "INSERT INTO history SET ?"
        db.query(postQUeryString, body, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    addNewProduct.then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
})

app.get("/history", (req, res) => {
    const addNewProduct = new Promise ((resolve, reject) => {
        const postQUeryString = "SELECT h.id, h.product_name, h.price, h.quantity, h.total_price, h.created_at, h.updated_at FROM history AS h ORDER BY  updated_at ASC"
        db.query(postQUeryString, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    addNewProduct.then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json(err)
    })
})