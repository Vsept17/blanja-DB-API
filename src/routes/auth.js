const authRouter = require('express').Router();
const authControllers = require("../controllers/auth");

authRouter.post("/register", authControllers.register);
authRouter.post("/login", authControllers.login);
// authRouter.delete("/logout", async (req, res, next) => {
//     try{
//         const { refreshToken } = req.body;
//         if (!refreshToken) throw createError.BadRequest
//     } catch {

//     }
    

// });

module.exports = authRouter;