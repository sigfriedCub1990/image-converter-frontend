const { ReceiveMessageCommand } = require("@aws-sdk/client-sqs");

/*
 * Reads a message from SQS
 *
 * @param {Object} sqsClient - Client instance to call SQS
 *
 * @return {SQSResponse}
 *
 * @type SQSReponse
 * SQSResponse.$metadata
 * SQSResponse.Messages<Message>
 *
 * @type Message
 * Message.MessageId
 * Message.ReceiptHandle
 * Message.MD5Body
 * Message.Body
 *
 */
function makeReadMessage({ sqsClient }) {
  return async () => {
    const receiveMessageCommand = new ReceiveMessageCommand({
      QueueUrl: "000000000000/photservice-completed-queue",
      VisibilityTimeout: 2, // in seconds
    });
    const response = await sqsClient.send(receiveMessageCommand);
    return response;
  };
}

module.exports = makeReadMessage;
