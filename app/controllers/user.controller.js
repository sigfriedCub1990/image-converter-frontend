const uuid = require("uuid");
const { writeFile } = require("node:fs/promises");
const { Buffer } = require("node:buffer");
const { usersDb } = require("../data-access");
const { uploadFile, sendMessage, downloadFile } = require("../use-cases/aws");
const { associateImageAndUser } = require("../use-cases/user");

class Message {
  constructor() {
    this.message = {};
  }

  key(newKey) {
    this.message.key = newKey;
    return this;
  }

  width(newWidth) {
    this.message.width = newWidth;
    return this;
  }

  height(newHeigth) {
    this.message.height = newHeigth;
    return this;
  }

  id(newId) {
    this.message.id = newId;
    return this;
  }

  build() {
    return JSON.stringify(this.message);
  }
}

const userController = Object.freeze({
  uploadImage: async (req, res) => {
    try {
      const key = uuid.v4();
      const { width, height } = req.body;

      const [, imageId] = await Promise.all([
        uploadFile({
          file: req.file.buffer,
          uuid: key,
        }),
        associateImageAndUser({
          userId: req.session.userId,
          imageUUID: key,
          resizedResolution: {
            width,
            height,
          },
        }),
      ]);

      const message = new Message()
        .key(key)
        .width(width)
        .height(height)
        .id(imageId)
        .build();

      await sendMessage(message);

      res.redirect("/user/profile");
    } catch (error) {
      req.flash("error", "Something went wrong. Try again.");
      res.status(400).json({
        error: {
          description: error.message,
        },
      });
    }
  },
  userProfile: async (req, res) => {
    const user = await usersDb.findOne(
      { _id: req.session.userId },
      { populate: ["images"] }
    );
    res.render("user/user-profile", { images: user.images });
  },
  downloadImage: async (req, res) => {
    const uuid = req.params.imageUUID;
    // Download file from S3
    const file = await downloadFile({ uuid });
    const buffer = new Buffer.from(await file.Body.transformToByteArray());
    // Write Buffer to temporal location
    await writeFile(`/tmp/${uuid}`, buffer);

    res.download(`/tmp/${uuid}`);
  },
});

module.exports = userController;
