var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/', express.static(path.join(__dirname, '../api/swagger')));

router.use('/v1', require('./api/v1'));

module.exports = router;
