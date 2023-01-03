const express = require("express");

const { indexController } = require("../controllers");

const router = express.Router();

router.route("/").get(indexController.mainPage);

module.exports = router;
