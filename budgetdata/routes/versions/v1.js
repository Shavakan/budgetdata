var express = require('express');
var router = express.Router();
var model = require('../../models/budget');
var mongoose = require('mongoose');

var Region = model.Region;
var Budget = model.Budget;
var Category = model.Category;
var Department = model.Department;
var Program = model.Program;

router.get('/', function(req, res, next) {
  res.send('BudgetData API Version 1');
});

router.all('*', function(req, res) {
  res.status('400').send('Bad Request');
});

module.exports = router;
