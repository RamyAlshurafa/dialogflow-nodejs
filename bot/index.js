var express = require('express');
var router = express.Router();
const messages = require("./messages");
const fulfillment = require("./fulfillment");

router.post('/messages', messages);
router.post('/fulfillment', fulfillment);

module.exports = router;
