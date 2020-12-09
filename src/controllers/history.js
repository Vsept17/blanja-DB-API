const historyModel = require("../models/history")
const form = require("../helpers/form")

module.exports = {
    createHistory: (req, res) => {
        const { body } = req;
        const level = req.decodedToken.level;
        const insertBody = {...body, 
            updated_at: new Date(Date.now()) }
        historyModel.createHistory(insertBody, level).then((data) => {
            const successCreate = {
                msg: "Data berhasil ditambahkan",
                data: {
                    id: data.insertId, 
                    ...insertBody
                }
            }
            form.success(res, successCreate)
        })
        .catch((err) => {
            form.error(res, err)
        })
    },

    readHistory: (req, res) => {
        const level = req.decodedToken.level;
        historyModel.readHistory(level).then((data) => {
            form.success(res, data)
        })
        .catch((err) => {
            form.error(res, err)
        })
    }
}