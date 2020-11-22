const productsModel = require("../models/products")

module.exports ={
    createProduct: (req, res) => {
        const { body } = req;

        productsModel.createProduct(body).then((data) => {
            const successCreate = {
                msg: "Data berhasil ditambahkan"
            }
            res.json(successCreate)
        })
        .catch((err) => {
            const error = {
                msg: "Data gagal ditambahkan",
                err
            }
            res.json(error)
        })
    },

    readProduct:  (req, res) => {
        
        productsModel.readProduct().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err)
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
            const successUpdate = {
                msg: "Data berhasil di update",
                data: {
                    id: data.updateId, updateBody
                },
            }
            res.json(successUpdate)
        })
        .catch((err) => {
            const error = {
                msg: "Data gagal diupdate",
                err
            }
            res.json(error)
        })
    },
    deleteProduct: (req, res) => {
        const { id } = req.params;
        productsModel.deleteProduct(id).then((data) => {
            const successDelete = {
                msg: "Data berhasil dihapus",
                data
            }
                res.json(successDelete)
        })
        .catch((err) => {
            res.json(err)
        })
    }
}
