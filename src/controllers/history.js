const historyModel = require("../models/history")
const form = require("../helpers/form")

module.exports = {
    createHistory: (req, res) => {
        const { body } = req;
        historyModel.createHistory(body).then((data) => {
            form.success(res, data)
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