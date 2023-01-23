const s3 = require("./s3");
const sqs = require("./sqs");

module.exports = Object.freeze({
  ...s3,
  ...sqs,
});
