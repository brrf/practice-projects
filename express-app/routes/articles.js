const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
//Bring in models
let Article = require('../models/Article')

//Load edit form
router.get('/edit/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
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
	article.author = req.body.author;
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
router.get('/add', (req, res) => {
	res.render('add_article', {
		title: 'Add Article'
	})
})

//submit POST Route
router.post('/add', [
	check('title', 'A title is required').not().isEmpty(),
	check('author', 'An author is required').not().isEmpty(),
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
		let article = new Article();
		article.title = req.body.title;
		article.author = req.body.author;
		article.body = req.body.body;

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
	let query = {_id:req.params.id}
	Article.remove(query, (err) => {
		if (err) {
			console.log(err)
		}
		req.flash('danger', 'Article removed!')
		res.send('Success')
	})
})

//Get single article
router.get('/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('article', {
			article: article
		})
	})
})

module.exports = router;