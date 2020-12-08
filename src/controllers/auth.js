const authModel = require("../models/auth");
const form = require("../helpers/form");
// let refreshTokens = []

module.exports = {
  register: (req, res) => {
    const { body } = req;
    authModel
      .postNewUser(body)
      .then(() => {
        form.success(res, {
          msg: "Register Berhasil",
          userData: {
            username: body.username,
            level: body.level,
          },
        });
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  login: (req, res) => {
    const { body } = req;
    authModel
      .postLogin(body)
      .then((data) => {
        form.success(res, data);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },
  // logout: (req, res) => {
  //     const refreshToken = req.decodedToken
  //     // refreshTokens = refreshTokens.filter(token => token !== refreshToken)
  //     authModel.postLogout(refreshToken)
  //     .then(() => {
  //         form.success(res, {
  //             msg: "Anda berhasil logout",
  //         })
  //     })
  //     .catch((err) => {
  //         form.error(res, err)
  //     })
  // }
};
