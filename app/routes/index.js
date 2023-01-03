const express = require("express");

const index = require("./index.routes");
const auth = require("./auth.routes");
const user = require("./user.routes");

const router = express.Router();

router.use(index);
router.use(auth);
router.use(user);

module.exports = router;
