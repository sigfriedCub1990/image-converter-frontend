const { S3Client } = require("@aws-sdk/client-s3");
const makeUploadFile = require("./upload-file");

const s3Client = new S3Client({
  endpoint: `http://127.0.0.1:4566`, // TODO: Figure how to read ENV variable here
});

const uploadFile = makeUploadFile({ s3Client });

module.exports = {
  uploadFile,
};
