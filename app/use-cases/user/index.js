const { usersDb } = require("../../data-access");

const makeAssociateImageAndUser = require("./associate-image-user");

const associateImageAndUser = makeAssociateImageAndUser({ userDb: usersDb });

module.exports = Object.freeze({
  associateImageAndUser,
});
