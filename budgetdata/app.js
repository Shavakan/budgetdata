var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layout');
app.enable('view cache');
app.engine('html', require('hogan-express'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());

/* url routing configuration redirection */
var routes = require('./routes/index')(app);

/* file hosting and http error handling */
// host static files
app.use('/static/', express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

/* error handlers */
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* Mongoose MongoDB connection setup */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoose connection error: '));
db.once('open', function() {
  require('./models/budget');
});
mongoose.connect('mongodb://localhost:27017/budgetdata-test');

/* Swagger setup */
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(SwaggerUi(swaggerExpress.runner.swagger));

  swaggerExpress.register(app);
});

module.exports = app;
