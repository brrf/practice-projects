const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');

mongoose.connect(config.database);
let db = mongoose.connection;

//Check for db errors
db.on('error', (err) => {
	console.log(err)
});

//Check db connection
db.once('open', () => {
	console.log('connected to mongodb')
})

//Init app
let app = express();
app.use(express.json())

//Bring in models
let Article = require('./models/article')

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set public folder

app.use(express.static(path.join(__dirname, '/public')))

//Express Session Middleware

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

//Express messages middleware

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Passport Config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function (req, res, next) {
	res.locals.user = req.user || null;
	next();
})

//Home Route
app.get('/', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) {
			console.lo(err)
		} else {
			res.render('index', {
				articles
			})
		}
	})
})

//Route files
let articles = require('./routes/articles');
let users = require('./routes/users');
app.use('/articles', articles);
app.use('/users', users)

//Start server
app.listen(3009, () => {
	console.log('Server running on port: 3009')
});