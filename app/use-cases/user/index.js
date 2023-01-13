const { usersDb, imageDb } = require("../../data-access");

const makeAssociateImageAndUser = require("./associate-image-user");

const associateImageAndUser = makeAssociateImageAndUser({
  userDb: usersDb,
  imageDb,
});

module.exports = Object.freeze({
  associateImageAndUser,
});
