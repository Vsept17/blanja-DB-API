const historyModel = require("../models/history")

module.exports = {
    createHistory: (req, res) => {
        const { body } = req;
        historyModel.createHistory(body).then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
    },

    readHistory: (req, res) => {
        historyModel.readHistory().then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.json(err)
        })
    }
}