const { PutObjectCommand } = require("@aws-sdk/client-s3");

function makeUploadFile({ s3Client }) {
  return async ({ file, uuid }) => {
    try {
      const command = new PutObjectCommand({
        Bucket: "photoservice",
        Body: file,
        Key: uuid,
      });
      return s3Client.send(command);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeUploadFile;
