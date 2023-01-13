const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
  url: { type: String, required: true },
  status: {
    type: String,
    enum: ["enqueued", "resized"],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = imageSchema;
