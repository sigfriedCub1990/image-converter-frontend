const { Consumer } = require("sqs-consumer");
const { imageDb } = require("./data-access");
const { QUEUE_URL, sqs } = require("./sqs");

const sqsConsumer = Consumer.create({
  queueUrl: QUEUE_URL,
  handleMessage: async (message) => {
    try {
      const { key } = JSON.parse(message.Body);
      await imageDb.update({ uuid: `${key}` }, { status: "resized" });
    } catch (error) {
      console.error("Something went wrong");
      console.log(error.message);
    }
  },
  sqs,
});

sqsConsumer.on("error", (err) => {
  // TODO: Use winston for this
  console.log("Error");
  console.error(err);
});

sqsConsumer.on("processing_error", (err) => {
  console.log("Error processing message from queue");
  console.error(err);
});

module.exports = sqsConsumer;
