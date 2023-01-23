const { GetObjectCommand } = require("@aws-sdk/client-s3");

function makeDownloadFile({ s3Client }) {
  return async ({ uuid }) => {
    try {
      const command = new GetObjectCommand({
        Bucket: "photoservice",
        Key: uuid,
      });
      return s3Client.send(command);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeDownloadFile;
