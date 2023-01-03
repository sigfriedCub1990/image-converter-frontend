const { uploadFile } = require("../use-cases/aws/s3");
const uuid = require("uuid");

const userController = Object.freeze({
  uploadImage: async (req, res) => {
    try {
      const key = uuid.v4();
      const { width, height } = req.body;
      await uploadFile({
        file: req.file.buffer,
        width,
        height,
        uuid: key,
      });
      res.json({ message: "File succesfully uploaded." });
    } catch (error) {
      res.status(400).json({
        error: {
          description: error.message,
        },
      });
    }
  },
});

module.exports = userController;
