const express = require('express');
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/nodekb');
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

//Bring in models
let Article = require('./models/Article')

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Set public folder

app.use(express.static(path.join(__dirname, '/public')))

//Home Route
app.get('/', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) {
			console.lo(err)
		} else {
			res.render('index', {
				name: 'Moshe',
				articles
			})
		}
	})
})

//Get single article
app.get('/article/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('article', {
			article: article
		})
	})
})

//Load edit form
app.get('/article/edit/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('edit_article', {
			title: 'Edit Article',
			article: article
		})
	})
})

//Add edited article
app.post('/articles/edit/:id', (req, res) => {
	let article = {};
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	let query = {_id:req.params.id}

	Article.update(query, article, err => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/')
		}

	})
})

//Add Article Route

app.get('/articles/add', (req, res) => {
	res.render('add_article', {
		title: 'Add Article'
	})
})

//submit POST Route
app.post('/articles/add', (req, res) => {
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;

	article.save( (err) => {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/')
		}

	})
})

//Delete article
app.delete('/article/:id', (req, res) => {
	let query = {_id:req.params.id}
	Article.remove(query, (err) => {
		if (err) {
			console.log(err)
		}
		res.send('Success')
	})
})

//Start server
app.listen(3009, () => {
	console.log('Server running on port: 3009')
})