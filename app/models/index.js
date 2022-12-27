const mongoose = require("mongoose");
const userSchema = require("./user.model");
const imageSchema = require("./image.model");

module.exports = {
  User: mongoose.model("User", userSchema),
  Image: mongoose.model("Image", imageSchema),
};
