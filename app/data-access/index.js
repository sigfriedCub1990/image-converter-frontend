const models = require("../models");

const makeUsersDb = require("./user.db");
const makeImageDb = require("./image.db");

const usersDb = makeUsersDb(models);
const imageDb = makeImageDb(models);

module.exports = {
  usersDb,
  imageDb,
};
