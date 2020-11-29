const searchModel = require("../models/search")
const form = require("../helpers/form")
module.exports = 
    (req, res) => {
        const { keyword } = req.query;
        const { category } = req.query;

     
        searchModel(category, keyword)
        .then((data) => {
            form.success(res, data);
        })
        .catch((err) => {
            const errorSearch = {
                msg: "Data tidak ditemukan",
                err
            }
            form.error(res, errorSearch)
        })
    }