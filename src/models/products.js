const db = require("../config/mySQL");
// const checkToken = require("../helpers/middleware/checkToken")

module.exports = {
  createProduct: (insertBody, level) => {
    return new Promise((resolve, reject) => {
      const postQUeryString = "INSERT INTO products SET ?";
      if (level > 1) {
        reject({
          msg: "Sorry, you are not Seller",
          status: 401,
        });
      } else {
        db.query( postQUeryString,  [insertBody, level], (err, data) => {
        
          if (!err) {
           resolve(data);
         } 
         else {
           reject(err);
         }
       });
      }
      
      
      
    });
  },

  readProduct: (param1, param2) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name, p.product_price, p.product_brand, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_image, p.product_condition, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p JOIN category on category.id = p.product_category" +
        param1 +
        param2;

      db.query(queryString, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  readProductPagination: (param1, param2, limit, offset, page) => {
    return new Promise((resolve, reject) => {
      const queryString =
        "SELECT p.id, p.product_name, p.product_price, p.product_brand, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_image, p.product_description, p.product_rate, p.created_at, p.updated_at FROM products AS p JOIN category on category.id = p.product_category" +
        param1 +
        param2 +
        " LIMIT ? OFFSET ?";

      db.query(queryString, [limit, offset, page], (err, data) => {
        // const totalData = Math.ceil(products.length / limit)
        const newResult = {
          products: data,
          pageInfo: {
            currentPage: page || 1,
            previousPage:
              page === 1 ? null : `/product?page=${page - 1}&limit=${limit}`,
            nextpage: data.length != limit || Math.ceil()
                ? null 
                : `/product?page=${page + 1}&limit=${limit}`,
            // totalPage: totalData
          },
          
        };

        console.log(data.length)
        if (!err) {
          resolve(newResult);
        } else {
          reject(err);
        }
      });
    });
  },

  readSingleProduct: (req) => {
    const { id } = req.params;

    return new Promise((resolve, reject) => {
      const qs =
        "SELECT p.id, p.product_name, p.product_price, p.product_brand, p.product_color, category.category_name, p.product_size, p.product_qty, p.product_condition, p.product_description, p.product_rate, p.product_image, p.created_at, p.updated_at FROM products AS p JOIN category on category.id = p.product_category WHERE p.id = ?";
          db.query(qs, id, (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        
      
    });
  },

  updateProduct: (updateBody, idBody, level) => {
    return new Promise((resolve, reject) => {
      const queryStr = "UPDATE products SET ? WHERE ?";
      if (level > 1) {
        reject({
          msg: "Sorry, you are not Seller",
          status: 401,
        });
      } else {
        db.query(queryStr, [updateBody, idBody, level], (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
    });
  },

  deleteProduct: (id,  level, deleteBody) => {
    return new Promise((resolve, reject) => {
      const postQUeryString = "DELETE FROM products WHERE id = ?";
      if (level > 1) {
        reject({
          msg: "Sorry, you are not Seller",
          status: 401,
        });
      } else {
        db.query(postQUeryString, [id, deleteBody, level], (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
      
    });
  },
};
