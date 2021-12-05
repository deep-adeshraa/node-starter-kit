var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')

// We are using handlebase view engine
var hbs = require('hbs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views/pages'));
app.set('view engine', 'hbs');

// Register partial folder
hbs.registerPartials(path.join(__dirname, 'server/views/partials'))

var dbConfig = require('./server/config/config.js');
mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function () {
	console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});

// Passport configuration
require('./server/config/passport')(passport);

// required for passport secret for session
app.use(session({
	secret: 'my-secret-text',
	saveUninitialized: true,
	resave: true,
	//store session on MongoDB using express-session + connect mongo,
	store: MongoStore.create({
		mongoUrl: dbConfig.url,
		collectionName: 'sessions'
	}),
}));

// Init passport authentication
app.use(passport.initialize());
// persistent login sessions
app.use(passport.session());


// Global variable to check loggedin or not
app.use(function(req, res, next) {
	app.locals.isLoggedIn = req.isAuthenticated();

	if (app.locals.isLoggedIn) {
		app.locals.userName = req.user.local.name;
		console.log("hi", req.user.local.name)
	}
	next();
});

app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Our Routes
var indexRouter = require('./server/routes/index');
var usersRouter = require('./server/routes/users');
var commentsRouter;

// Our controllers : TODO: move it to routes
var comments = require('./server/controllers/comments_controller');

// Our Paths
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/comments', comments.hasAuthorization, comments.list);
app.post('/comments', comments.hasAuthorization, comments.create);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler for errors other than 404
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// Set the port
app.set('port', process.env.PORT || 3000);
let server = app.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;