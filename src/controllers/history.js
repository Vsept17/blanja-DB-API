const historyModel = require("../models/history")
const form = require("../helpers/form")

module.exports = {
    createHistory: (req, res) => {
        const { body } = req;
        const insertBody = {...body, 
            updated_at: new Date(Date.now()) }
        historyModel.createHistory(insertBody).then((data) => {
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
        historyModel.readHistory().then((data) => {
            form.success(res, data)
        })
        .catch((err) => {
            form.error(res, err)
        })
    }
}