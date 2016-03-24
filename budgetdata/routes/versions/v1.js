var express = require('express');
var router = express.Router();
var model = require('../../models/budget');

var Region = model.Region;

/* Time logger */
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* Finds list of all budgets */
router.route('/')
  .get(function(req, res) {
    Region.find(
      {},
      {
        '_id': false,
        'budgets': false
      },
      function(err, results) {
        if (err) {
          res.status('500').send('DB Internal Error');
          return console.error(err);
        }

        if (results) {
          res.json(results);
        } else {
          res.status('400').send('Bad URL Request');
        }
      }
    );
  });

/* Finds list of years of all budgets of a region */
router.route('/[A-z]+/')
  .get(function(req, res) {
    Region.find(
      {
        'name_en': req.url.toString().split('/')[1].charAt(0).toUpperCase() + req.url.toString().split('/')[1].slice(1)
      },
      {
        '_id': false,
        'name_en': false,
        'name_kr': false,
        'budgets.categories': false,
        'budgets.currency': false
      },
      function(err, results) {
        if (err) {
          res.status('500').send('DB Internal Error');
          return console.error(err);
        }

        if (results) {
          years = [];
          results.forEach(function(res) {
            res.budgets.forEach(function(budgets) {
              years.push(budgets.year);
            });
          }, this);

          res.json(years);
        } else {
          res.status('400').send('Bad URL Request');
        }
      }
    );
  });

/* Category builder function :
 * Generates tree-structured category object */
var buildCategory = function(cat) {
  if ('children' in cat && cat.children.length > 0) {
    var tree = {};
    cat.children.forEach(function(subcat) {
      tree[subcat.name] = buildCategory(subcat);
    });
    return tree;
  } else {
    if (cat.name == '보전지출') {
      // console.log('cat ' + cat + cat.name + Object.keys(cat));
      if ('programs' in cat) {
        // console.log('length: ' + cat.programs.length);
      }
    }
    if ('programs' in cat && cat.programs.length > 0) {
      var list = [];
      cat.programs.forEach(function(prog) {
        // console.log(2);
        // console.log(prog);
        list.push(prog.name);
      });
      // console.log(list);
      return list;
    } else {
      // return [];
    }
  }
  if (cat.name === '보전지출') {
    // TODO: ????????????????????
    console.log(cat);
    console.log(cat.name);
    // console.log(cat.children.length, cat.children);
    // console.log(cat.programs[0]);
  }
  if ('programs' in cat && cat.programs.length > 0) {
    // console.log(cat.programs.length);
  }
};

/* Budget.all
 *
 * Not recommended to use */
router.route('/[A-z]+/[0-9]+/')
  .get(function(req, res) {
    if ('name' in req.query) {
      var likeTriggered = ('like' in req.query && req.query['like']);
      // TODO: Query implementation
      res.status('500').send('Query not yet implemented');
    } else {
      Region.findOne(
        {
          'name_en': req.url.toString().split('/')[1].charAt(0).toUpperCase() + req.url.toString().split('/')[1].slice(1),
          'budgets.year': req.url.toString().split('/')[2]
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

          if (results) {
            res.json(results.budgets);
          } else {
            res.status('400').send('Bad URL Request');
          }
        }
      );
    }
  });

/* Finds all categories of a budget */
router.route('/[A-z]+/[0-9]+/category/')
  .get(function(req, res) {
    if ('name' in req.query) {
      var likeTriggered = ('like' in req. query && req,query['like']);
      // TODO: Query implementation
      res.status('500').send('Query not yet implemented');
    } else {
      Region.findOne(
        {
          'name_en': req.url.toString().split('/')[1].charAt(0).toUpperCase() + req.url.toString().split('/')[1].slice(1),
          'budgets.year': req.url.toString().split('/')[2]
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

          // TODO: Complete category inspector function
          if (results) {
            var category = {};

            // Can assume budgets.length() == 0 because of findOne
            results.budgets[0].categories.forEach(function(cat) {
              category[cat.name] = buildCategory(cat);
            });
            // category = buildCategory(results.budgets[0].categories[0]);
            res.json(category);
          } else {
            res.status('400').send('Bad URL Request');
          }
        }
      );
    }
  });

/* Finds budget total value of a category */
router.route('/[A-z]+/[0-9]+/category/value')
  .get(function(req, res) {
    if ('name' in req.query) {
      // TODO: Query implementation
      res.status('500').send('Query not yet implemented');
    } else {
      Region.findOne(
        {
          'name_en': req.url.toString().split('/')[1].charAt(0).toUpperCase() + req.url.toString().split('/')[1].slice(1),
          'budgets.year': req.url.toString().split('/')[2]
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

          if (results) {
            res.json(results);
          } else {
            res.status('400').send('Bad URL Request');
          }
        }
      );
    }
  });

router.route('/[A-z]+/0-9]+/program')
  .get(function(req, res) {
    if ('name' in req.query) {
      var likeTriggered = ('like' in req.query && req.query['like']);
      // TODO: Query implementation
      res.status('500').send('Query not yet implemented');
    } else {
      res.status('400').send('Required query field "name" missing')
    }
  });

/* Request URL error handling */
router.all('*', function(req, res) {
  res.status('400').send('Bad Request');
});

module.exports = router;
