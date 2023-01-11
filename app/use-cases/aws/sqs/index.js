const { SQSClient } = require("@aws-sdk/client-sqs");

const makeDeleteMessage = require("./delete-message");
const makeReadMessage = require("./read-message");
const makeSendMessage = require("./send-message");

const sqsClient = new SQSClient({
  endpoint: "http://127.0.0.1:4566",
});

const sendMessage = makeSendMessage({ sqsClient });
const readMessage = makeReadMessage({ sqsClient });
const deleteMessage = makeDeleteMessage({ sqsClient });

module.exports = {
  sendMessage,
  readMessage,
  deleteMessage,
};
