var express = require('express');
var router = express.Router();
var model = require('../../models/budget');
var mongoose = require('mongoose');

var Region = model.Region;
var Budget = model.Budget;
var Category = model.Category;
var Program = model.Program;

var db = mongoose.connection;

router.get('/', function(req, res, next) {
  res.send('BudgetData API Version 1');
});

// TODO: REGEXify hardcoded URL
router.get('/seoul/2016/', function(req, res) {
  Region.findOne(
    {
      'name_en': 'Seoul',
      'budgets.year': 2016
    },
    {
      '_id': false,
      'name_en': false,
      'name_kr': false,
    },
    function(err, results) {
      if (err) return console.error(err);
      
      res.json(results.budgets);
  });
});

/* Request URL error handling */
router.all('*', function(req, res) {
  res.status('400').send('Bad Request');
});

module.exports = router;
