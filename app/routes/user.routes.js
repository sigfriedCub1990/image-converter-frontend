const express = require("express");
const multer = require("multer");
const upload = multer();
const { userController } = require("../controllers");

const router = express.Router();

router
  .route("/profile")
  .get((_, res) => res.json({ message: "User's profile" }));
router.route("/user/profile").get(isLoggedIn, userController.userProfile);

router.route("/user/upload").get((_, res) => res.render("user/upload-image"));
router
  .route("/user/upload")
  .post(upload.single("photo"), userController.uploadImage);

module.exports = router;
