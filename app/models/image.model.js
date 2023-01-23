const mongoose = require("mongoose");

const { Schema } = mongoose;

const imageSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  url: { type: String, required: true },
  status: {
    type: String,
    enum: ["enqueued", "resized"],
  },
  createdAt: { type: Date, default: Date.now },
  resizedResolution: {
    width: Number,
    height: Number,
  },
});

module.exports = imageSchema;
