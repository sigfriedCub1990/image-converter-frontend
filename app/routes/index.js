const express = require("express");

const index = require("./index.routes");

const router = express.Router();

router.use(index);

module.exports = router;
