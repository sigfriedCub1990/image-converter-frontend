const { usersDb: userDb } = require("../../data-access");
const makeLoginUser = require("./login-user");
const makeRegisterUser = require("./register-user");

const registerUser = makeRegisterUser({ userDb });
const loginUser = makeLoginUser({ userDb });

const authService = Object.freeze({
  registerUser,
  loginUser,
});

module.exports = {
  authService,
  registerUser,
  loginUser,
};
