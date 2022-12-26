const express = require("express");

const indexController = require("../controllers/index.controller");

const router = express.Router();

router.route("/").get(indexController.mainPage);

module.exports = router;
