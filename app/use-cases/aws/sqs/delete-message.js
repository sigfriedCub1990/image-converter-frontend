const { DeleteMessageCommand } = require("@aws-sdk/client-sqs");

function makeDeleteMessage({ sqsClient }) {
  return async (receiptHandle) => {
    const deleteCommand = new DeleteMessageCommand({
      QueueUrl: "000000000000/photservice-completed-queue",
      ReceiptHandle: receiptHandle,
    });
    const response = await sqsClient.send(deleteCommand);
    return response;
  };
}

module.exports = makeDeleteMessage;
