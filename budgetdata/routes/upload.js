var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var model = require('../models/budget');
var Q = require('q');

var Region = model.Region;
var Budget = model.Budget;
var Category = model.Category;
var Department = model.Department;
var Program = model.Program;

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.route('/')
  .get(function(req, res) {
    res.render('upload');
  })
  .post(function(req, res) {
    /* Temporary code to generate Seoul 2016 data. */
    MongoClient.connect('mongodb://localhost:27017/budgetdata-test', function(err, db) {
      if (err) {
        throw err;
      }
      db.collection('region').findOne({
        name_kr: '서울',
        name_en: 'Seoul'
      }, function(err, cursor) {
        if (!cursor) {
          // Region does not exist
          db.collection('region').insert({
            name_kr: '서울',
            name_en: 'Seoul',
            parent: undefined,
            childeren: undefined
          }, function(err, cursor) {
            res.status(500).send({code: 1, msg: 'region created'});
          });
        } else {
          db.collection('budget').findOne({
            region: cursor._id,
            year: 2016
          }, function(err, budget) {
            if (!budget) {
              // Budget does not exist
              db.collection('budget').insert({
                region: cursor._id,
                year: 2016,
                programs: [],
                categories: [],
                currency: 'KRW'
              }, function(err, budget) {
                res.status(500).send({code: 2, msg: 'budget created'})
              });
            } else {
              res.send({code: 0, msg: 'good'});
            }
          });
        }
      });
    });
  })
  .put(function(req, res) {
    res.send({msg: req.body.index});
  });

module.exports = router;
