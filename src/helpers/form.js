module.exports = {
    success: (res,data) => {
        const resObject = {
            msg: "Data success",
            status : 200,
            data: data
        };
        res.json(resObject)
    },

    error : (res) => {
        const resObject = {
            msg: "Data error",
            status: 500
        }
        res.status(500).json(resObject)
    }
}