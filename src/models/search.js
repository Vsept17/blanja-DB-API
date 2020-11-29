const db = require("../config/mySQL")

module.exports = 
     (category, keyword) => {
        return new Promise ((resolve, reject) => {
            const querySearch = `SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p JOIN category ON category.id = p.product_category WHERE p.product_name LIKE "%${keyword}%" AND category.category_name LIKE "%${category}%"`;
            db.query(querySearch, [category, keyword], (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        })
    }
