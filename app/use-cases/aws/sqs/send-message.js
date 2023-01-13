const { SendMessageCommand } = require("@aws-sdk/client-sqs");

function makeSendMessage({ sqsClient }) {
  return async function (message) {
    try {
      const command = new SendMessageCommand({
        MessageBody: message,
        QueueUrl: "000000000000/photoservice-queue",
      });
      await sqsClient.send(command);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

module.exports = makeSendMessage;
