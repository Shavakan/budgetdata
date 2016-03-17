var express = require('express');
var router = express.Router();
var model = require('../../models/budget');

var Region = model.Region;

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', function(req, res) {
  res.send('BudgetData API Version 1');
});

router.get('/budget/[A-z]+/[0-9]+/', function(req, res) {
  Region.findOne(
    {
      'name_en': req.url.toString().split('/')[2].charAt(0).toUpperCase() + req.url.toString().split('/')[2].slice(1),
      'budgets.year': req.url.toString().split('/')[3]
    },
    {
      '_id': false,
      'name_en': false,
      'name_kr': false
    },
    function(err, results) {
      if (err) {
        res.status('500').send('DB Internal Error');
        return console.error(err);
      }

      console.log(results);
      if (results) {
        res.json(results.budgets);
      } else {
        res.status('400').send('Bad URL Request');
      }
    }
  );
});

/* Request URL error handling */
router.all('*', function(req, res) {
  res.status('400').send('Bad Request');
});

module.exports = router;
