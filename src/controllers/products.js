const productsModel = require("../models/products");
const form = require("../helpers/form");
module.exports = {
  createProduct: (req, res) => {
    const { body } = req;
    const level = req.decodedToken.level;
    const filePath = JSON.stringify(
      req.files.map((e) => "/images/" + e.filename)
  )
  console.log(level)
    const insertBody = { ...body, updated_at: new Date(Date.now()), product_image: filePath, };
    productsModel
      .createProduct(insertBody, level, filePath)
      .then((data) => {

        const successCreate = {
          msg: "Data berhasil ditambahkan",
          data: {
            id: data.insertId,
            ...insertBody,
   
          },
        };

        form.success(res, successCreate);
      })
      .catch((err) => {
        
        const error = {
          msg: "Data gagal ditambahkan",
          err,
        };
        form.error(res, error);
      });
  },

  readProduct: (req, res) => {
    const { sort, sortDesc } = req.query;

    let order = "";
    let desc = "";

    if (sort == 1) {
      order = " ORDER BY product_name";
    } else if (sort == 2) {
      order = " ORDER BY product_price";
    } else if (sort == 3) {
      order = " ORDER BY product_update";
    }
    if (!order == "") {
      if (sortDesc == 1) {
        desc = " DESC";
      }
    }
    productsModel
      .readProduct(order, desc)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  readProductPagination: (req, res) => {
    const { query } = req;
    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const offset = (Number(query.page) - 1) * limit || 0;
    
    const { sort, sortDesc } = req.query;
    let order = "";
    let desc = "";

    if (sort == 1) {
      order = " ORDER BY product_name";
    } else if (sort == 2) {
      order = " ORDER BY product_price";
    } else if (sort == 3) {
      order = " ORDER BY product_update";
    }
    if (!order == "") {
      if (sortDesc == 1) {
        desc = " DESC";
      }
    }
    productsModel
      .readProductPagination(desc, order, limit, offset, page)
      .then((data) => {
        if (Math.ceil(data.products / limit) == data.products) {
          res.status(404).json({
            msg: "Pages Not Found",
            status: 404,
          });
        } else {
          form.success(res, data);
        }
      })
      .catch((err) => {
        const pagesFull = {
          msg: "Last Pages",
          status: 404,
          err,
        };
        form.error(res, pagesFull);
      });
  },

  readSingleProduct: (req, res) => {
    productsModel
      .readSingleProduct(req)
      .then((data) => {
        if (!data.length) {
          res.status(404).json({
            msg: "Data Not Found",
            status: 404,
          });
        } else {
          form.success(res, data[0])
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  updateProduct: (req, res) => {
    const { id } = req.body;
    const { body } = req;
    const level = req.decodedToken.level;
    const updateBody = { ...body, updated_at: new Date(Date.now()) };
    const idBody = { id };

    productsModel
      .updateProduct(updateBody, idBody, level)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Data tidak diitemukan",
            status: 404,
          });
        } else {
          const successUpdate = {
            msg: "Data berhasil di update",
            data: {
              id: data.updateId,
              updateBody,
            },
          };
          form.success(res, successUpdate);
        }
      })
      .catch((err) => {
        const error = {
          msg: "Data gagal diupdate",
          err,
        };
        form.error(res, error);
      });
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
    const level = req.decodedToken.level;
    productsModel
      .deleteProduct(id, level)
      .then((data) => {
        if (data.affectedRows === 0) {
          res.status(404).json({
            msg: "Data tidak diitemukan",
            status: 404,
          });
        } else {
          const successDelete = {
            msg: "Data berhasil dihapus",
            status: 200,
          };
          res.json(successDelete);
        }
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
};
