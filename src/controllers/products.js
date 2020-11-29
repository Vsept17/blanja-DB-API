const productsModel = require("../models/products")
const form = require("../helpers/form")
module.exports ={
    createProduct: (req, res) => {
        const { body } = req;
        const insertBody = {...body, 
            updated_at: new Date(Date.now()) }
        productsModel.createProduct(insertBody).then((data) => {
            const successCreate = {
                msg: "Data berhasil ditambahkan",
                data: {
                    id: data.insertId, 
                    ...insertBody
                }
            }
            form.succes(res, successCreate)
        })
        .catch((err) => {
            const error = {
                msg: "Data gagal ditambahkan",
                err
            }
            form.error(res, error)
        })
    },

    readProduct:  (req, res) => {
        
        productsModel.readProduct().then((data) => {
            form.success(res, data);
        }).catch((err) => {
            form.error(res, err)
        })
    },

    readSingleProduct: (req, res) => {
        
        productsModel.readSingleProduct(req).then((data) => {
            if (!data.length) {
                res.status(404).json({
                    msg: "Data Not Found",
                    status: 404,
                });
            } else {
                form.success(res, data[0]);
            }
        }).catch((err) => {
            form.error(res, err);
        })
    },

    updateProduct: (req, res) =>{
        const { id } = req.body
        const { body } = req;
        const updateBody = {...body, 
            updated_at: new Date(Date.now()) }
        const idBody = { id };

        productsModel.updateProduct(updateBody, idBody)
        .then((data) => {
            if (data.affectedRows === 0) {
                res.status(404).json({
                    msg: "Data tidak diitemukan",
                    status: 404
                })
            } else {
                const successUpdate = {
                msg: "Data berhasil di update",
                data: {
                    id: data.updateId, updateBody
                }
            }
            form.success(res, successUpdate)
        }
            
        })
        .catch((err) => {
            const error = {
                msg: "Data gagal diupdate",
                err
            }
            form.error(res, error)
        })
    },

    deleteProduct: (req, res) => {
        const { id } = req.params;
    
        productsModel.deleteProduct(id).then((data) => {
            if (data.affectedRows === 0) {
                res.status(404).json({
                    msg: "Data tidak diitemukan",
                    status: 404
                })
            } else {
                const successDelete = {
                    msg: "Data berhasil dihapus",
                    status: 200,
                }
            form.succes(res, successDelete)
        }  
        })
        .catch((err) => {
            res.error(res, err)
        })
    }
}
