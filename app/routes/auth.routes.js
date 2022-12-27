const express = require("express");
const { authController } = require("../controllers");

const router = express.Router();

router.route("/auth/register").get((_, res) => res.render("register"));
router.route("/auth/register").post(authController.registerUser);

module.exports = router;
