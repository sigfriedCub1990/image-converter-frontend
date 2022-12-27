const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  password: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  images: [{ type: Schema.Types.ObjectId, ref: "Image" }],
});

module.exports = userSchema;
