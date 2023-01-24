const { usersDb, imageDb } = require("../../data-access");

const makeAssociateImageAndUser = require("./associate-image-user");
const makeDownloadImage = require("./download-image");

const associateImageAndUser = makeAssociateImageAndUser({
  userDb: usersDb,
  imageDb,
});
const downloadImage = makeDownloadImage();

module.exports = Object.freeze({
  associateImageAndUser,
  downloadImage,
});
