const mongoose = require("mongoose");

const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);

module.exports = mongoose;
