var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;

var MySQLStore = require('express-mysql-session')(session);
var options={
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '324423',
  database: 'mynote'
};


var index = require('./routes/index')(app);
var users = require('./routes/users')(app);
var mynoteLogin = require('./routes/mynoteLogin')(app);
var mynoteEntry = require('./routes/mynoteEntry')(app);
var mynoteMypage = require('./routes/mynoteMypage')(app);
var mynoteMynotepage = require('./routes/mynoteMynotepage')(app);
var mynoteEdit = require('./routes/mynoteEdit')(app);
var mynoteSharepage = require('./routes/mynoteSharepage')(app);

var app = express();

app.use(session({
 secret:'simpson',
 resave: false,
 saveUninitialized: true,
 store:new MySQLStore(options)
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: 5000000}));
app.use(bodyParser.urlencoded({limit: 5000000, extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/mynote',mynoteLogin);
app.use('/mynote',mynoteEntry);
app.use('/mynote',mynoteMypage);
app.use('/mynote',mynoteMynotepage);
app.use('/mynote',mynoteEdit);
app.use('/mynote',mynoteSharepage);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
