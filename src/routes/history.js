const express = require('express')

const historyRouter = express.Router();

const historyControllers = require("../controllers/history")

// TABEL HISTORY
historyRouter.post("/", historyControllers.createHistory)

historyRouter.get("/", historyControllers.readHistory)

module.exports = historyRouter;