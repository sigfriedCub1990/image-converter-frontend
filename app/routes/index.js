const express = require("express");

const index = require("./index.routes");
const auth = require("./auth.routes");

const router = express.Router();

router.use(index);
router.use(auth);

module.exports = router;
