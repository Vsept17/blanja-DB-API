const db = require("../config/mySQL");

module.exports = {
    createHistory: (insertBody, level) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "INSERT INTO history SET ?"
            if (level > 1) {
                reject({
                  msg: "Sorry, you are not Seller",
                  status: 401,
                });
              } else {
                db.query(postQUeryString, [insertBody, level], (err, data) => {
                    if(!err) {
                        resolve(data)
                    } else {
                        reject(err)
                    }
                })
              }
            
        })
    },

    readHistory: (level) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "SELECT h.id, h.product_name, h.price, h.color, h.size, h.quantity, h.total_price, h.created_at, h.updated_at FROM history AS h ORDER BY  updated_at ASC"
            if (level > 1) {
                reject({
                  msg: "Sorry, you are not Seller",
                  status: 401,
                });
              } else {
                db.query(postQUeryString, level, (err, data) => {
                    if(!err) {
                        resolve(data)
                    } else {
                        reject(err)
                    }
                })
              }
            
        })
    }
}