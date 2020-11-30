const db = require("../config/mySQL");

module.exports = {
    createProduct : (insertBody) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "INSERT INTO products SET ?"
            db.query(postQUeryString, [insertBody], (err, data) => {
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
            const queryString = "SELECT p.id, p.product_name, p.product_price, p.product_brand, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p JOIN category on category.id = p.product_category"
    
            db.query(queryString, (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err)
                }
            })
        });
    },

    readSingleProduct: (req) => {
        const { id } = req.params;
        return new Promise((resolve, reject) => {
            const qs = "SELECT p.id, p.product_name, p.product_price, p.product_brand, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p JOIN category on category.id = p.product_category WHERE p.id = ?"
            db.query(qs,  id, (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
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

    deleteProduct: (id, deleteBody) => {
        return new Promise ((resolve, reject) => {
            const postQUeryString = "DELETE FROM products WHERE id = ?"
            db.query(postQUeryString, [id, deleteBody], (err, data) => {
                if(!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    }


}