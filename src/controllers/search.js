const searchModel = require("../models/search")

module.exports = 
    (req, res) => {
        const { q } = req.query;
        const keyword = "%" + q + "%"
     
        searchModel(keyword)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            const errorSearch = {
                msg: "Data tidak ditemukan",
                err
            }
            res.json(errorSearch)
        })
    }