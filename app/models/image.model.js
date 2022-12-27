const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
  url: { type: String, required: true },
  resized: Boolean,
  createdAt: { type: Date, default: Date.now },
});

module.exports = imageSchema;
