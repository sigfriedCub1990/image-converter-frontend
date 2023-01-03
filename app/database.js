const mongoose = require("mongoose");

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const handleMongooseError = (message) => (error) => {
  console.log(message);
  console.error(error.message);
};

const handleError = handleMongooseError("Mongoose Error");
const disconnectError = handleMongooseError("MongoDB disconnected error");

mongoose.set("strictQuery", false);
mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
  .then(() => console.log(`Connected to: ${dbHost}:${dbPort}/${dbName}`))
  .catch(handleError);

mongoose.connection.on("error", handleError);
mongoose.connection.on("disconnect", disconnectError);

module.exports = mongoose;
