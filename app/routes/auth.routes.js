const express = require("express");
const { authController } = require("../controllers");
const redirectIfLoggedIn = require("../middlewares/is-logged-in");

const router = express.Router();

const redirectToIndex = redirectIfLoggedIn("/");

router
  .route("/auth/register")
  .get(redirectToIndex, (_, res) => res.render("register"));
router.route("/auth/register").post(authController.registerUser);

router
  .route("/auth/login")
  .get(redirectToIndex, (_, res) => res.render("login"));
router.route("/auth/login").post(authController.loginUser);

router.route("/auth/logout").get((req, res) => {
  delete req.session.userId;
  res.redirect("/");
});

module.exports = router;
