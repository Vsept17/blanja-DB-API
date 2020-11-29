const productSortModel = require("../models/product-sort");
const form = require("../helpers/form");

module.exports ={
    sortBy: (req, res) => {
        const { key } = req.query
        const { sort } = req.query
        productSortModel.sortBy(key, sort)
        .then((data) => {
            form.success(res, data);
        }).catch((err) => {
            form.error(res, err)
        })
    }
}