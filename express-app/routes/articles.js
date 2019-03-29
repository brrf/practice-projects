const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//Bring in models
let Article = require('../models/article');
let User = require('../models/user')

//Load edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		if (article.author != req.user._id) {
			req.flash('danger', 'Not authorized');
			res.redirect('/')
		}
		res.render('edit_article', {
			title: 'Edit Article',
			article: article
		})
	})
})

//Add edited article
router.post('/edit/:id', (req, res) => {
	let article = {};
	article.title = req.body.title;
	article.author = req.user._id;
	article.body = req.body.body;

	let query = {_id:req.params.id}

	Article.update(query, article, err => {
		if (err) {
			console.log(err);
			return;
		} else {
			req.flash('success', 'Article updated!')
			res.redirect('/')
		}

	})
})

//Add Article Route
router.get('/add', ensureAuthenticated, (req, res) => {
	res.render('add_article', {
		title: 'Add Article'
	})
})

//submit POST Route
router.post('/add', [
	check('title', 'A title is required').not().isEmpty(),
	check('body', 'A body is required').not().isEmpty()	
	], (req, res, next) => {

//Get errors
	let errors = validationResult(req);
	if (!errors.isEmpty()) {
		return (res.render('add_article', {
    		title: 'Add Article Working',
    		errors: errors.mapped()
    	}))
	} else { 
		let article = new Article({
			title: req.body.title,
			author: req.user._id,
			body: req.body.body
		});

		article.save( (err) => {
			if (err) {
				console.log(err);
				return;
			} else {
				req.flash('success', 'Article added!')
				res.redirect('/')

			}
		})
	}
});

//Delete article
router.delete('/:id', (req, res) => {
	if(!req.user._id) {
		res.status(500).send();
	}
	let query = {_id:req.params.id}

	Article.findById(req.params.id, (err, article) => {

		if (article.author != req.user._id) {
			res.status(500).send();
		} else {
			Article.remove(query, (err) => {
				if (err) {
					console.log(err)
				}
				req.flash('danger', 'Article removed!')
				res.send('Success')
			})
		}
	})	
})

//Get single article
router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, article) {
    User.findById(article.author, function(err, user) {
      res.render('article', {
        article: article,
        author: user.name
      });
    });
  });
});

//Access control
function ensureAuthenticated (req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	} else {
		req.flash('danger', 'Please login');
		res.redirect('/users/login')
	}
}

module.exports = router;