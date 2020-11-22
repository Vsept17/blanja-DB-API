const mySQL = require("mysql")

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

module.exports = db;