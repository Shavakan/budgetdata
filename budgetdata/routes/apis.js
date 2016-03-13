var express = require('express');
var router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res, next) {
  res.send('Welcome to BudgetData API Server!');
});

router.use('/v1', require('./versions/v1'));

module.exports = router;
