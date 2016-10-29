/** BudgetData URL Routing Configuration 
 *
 * users: 
 *  - User session (to be implemented)
 * api: 
 *  - Swagger & API implementation
 * upload: 
 *  - Uploading new data (to be implemented)
 *
 **/
var express = require('express');
var path = require('path');

module.exports = function(app) {
  /* Time logger */
  app.use(function timeLog(req, res, next) {
    var date = new Date().toISOString();
    process.stdout.write(date + ": ");
    next();
  });

  app.use('/users', require('./users'));
  app.use('/api', express.static(path.join(__dirname, '../api/swagger')));
  app.use('/api/v1/', require('./api/v1'));
  app.use('/upload', require('./upload'));

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
}
