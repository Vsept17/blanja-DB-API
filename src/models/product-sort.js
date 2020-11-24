const db = require("../config/mySQL");

module.exports = {
    sortByName: () => {
        return new Promise((resolve, reject) => {
            const queryStringByName = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY product_name ASC"
    
            db.query(queryStringByName, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        });
    },

    sortByUpdate: () => {
        return new Promise((resolve, reject) => {
            const queryStringByUpdate = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY updated_at DESC"
    
            db.query(queryStringByUpdate, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        });
    },

    sortByPrice: () => {
        return new Promise((resolve, reject) => {
            const queryStringByPrice = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY product_price DESC"
    
            db.query(queryStringByPrice, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        });
    }
}