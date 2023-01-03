const { SQSClient } = require("@aws-sdk/client-sqs");
const makeSendMessage = require("./send-message");

const sqsClient = new SQSClient({
  endpoint: "http://127.0.0.1:4566",
});

const sendMessage = makeSendMessage({ sqsClient });

module.exports = {
  sendMessage,
};
