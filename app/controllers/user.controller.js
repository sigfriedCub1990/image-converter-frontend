const uuid = require("uuid");
const { uploadFile, sendMessage } = require("../use-cases/aws");
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
        }),
      ]);

      const message = new Message()
        .key(key)
        .width(width)
        .height(height)
        .id(imageId)
        .build();

      await sendMessage(message);

      req.flash("info", "Image enqued for resizing.");
      res.redirect("/");
    } catch (error) {
      req.flash("error", "Something went wrong. Try again.");
      res.status(400).json({
        error: {
          description: error.message,
        },
      });
    }
  },
});

module.exports = userController;
