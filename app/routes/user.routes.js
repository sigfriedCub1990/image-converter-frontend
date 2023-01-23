const express = require("express");
const multer = require("multer");
const upload = multer();
const { userController } = require("../controllers");

const router = express.Router();

const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    next(
      new Error(
        "403: You're not allowed to see this page. Please, log in first."
      )
    );
  }
};

router.route("/user/profile").get(isLoggedIn, userController.userProfile);

router
  .route("/user/upload")
  .get(isLoggedIn, (_, res) => res.render("user/upload-image"));
router
  .route("/user/upload")
  .post(upload.single("photo"), userController.uploadImage);
router
  .route("/user/download/:imageUUID")
  .get(isLoggedIn, userController.downloadImage);

module.exports = router;
