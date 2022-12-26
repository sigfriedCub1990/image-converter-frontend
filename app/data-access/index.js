const models = require("../models");

const makeUsersDb = require("./user.db");

const usersDb = makeUsersDb(models);

module.exports = {
  usersDb,
};
