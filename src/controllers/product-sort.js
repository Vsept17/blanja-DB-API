const productSortModel = require("../models/product-sort");

module.exports ={
    sortByNameProduct: (req, res) => {
        productSortModel.sortByName()
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err)
        })
    },

    sortByUpdateProduct: (req, res) => {
        productSortModel.sortByUpdate()
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err)
        })
    },

    sortByPriceProduct: (req, res) => {
        productSortModel.sortByPrice()
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json(err)
        })
    }
}