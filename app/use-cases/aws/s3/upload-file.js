const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { sendMessage } = require("../sqs");
const { imageDb } = require("../../../data-access/");

function makeUploadFile({ s3Client }) {
  return async ({ file, width, height, uuid }) => {
    try {
      const command = new PutObjectCommand({
        Bucket: "photoservice",
        Body: file,
        Key: uuid,
      });
      const response = s3Client.send(command);
      const inserted = await imageDb.insert({
        url: `photoservice/${uuid}`,
        resize: false,
      });
      const message = JSON.stringify({
        url: `photoservice/${uuid}`,
        width,
        height,
        id: inserted._id.toString(),
      });
      await sendMessage(message);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeUploadFile;
