const { usersDb } = require("../../data-access");
const makeRegisterUser = require("./register-user");

const registerUser = makeRegisterUser({ userDb: usersDb });

const authService = Object.freeze({
  registerUser,
});

module.exports = {
  authService,
  registerUser,
};
