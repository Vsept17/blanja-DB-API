const db = require("../config/mySQL");

module.exports = {
    createHistory: (insertBody) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "INSERT INTO history SET ?"
            db.query(postQUeryString, [insertBody], (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },

    readHistory: () => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "SELECT h.id, h.product_name, h.price, h.color, h.size, h.quantity, h.total_price, h.created_at, h.updated_at FROM history AS h ORDER BY  updated_at ASC"
            db.query(postQUeryString, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }
}