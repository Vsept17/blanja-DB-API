const db = require("../config/mySQL");

module.exports = {
    createProduct : (body) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "INSERT INTO products SET ?"
            db.query(postQUeryString, body, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },

    readProduct: () => {
        return new Promise((resolve, reject) => {
            const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p join category on category.id = p.product_category ORDER BY id ASC"
    
            db.query(queryString, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        });
    },

    updateProduct: (updateBody, idBody) => {
        return new Promise ((resolve, reject) => {
            const queryStr = "UPDATE products SET ? WHERE ?"
            db.query(queryStr, [updateBody, idBody], (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },

    deleteProduct: (id) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "DELETE FROM products WHERE id = ?"
            db.query(postQUeryString, id, (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }


}