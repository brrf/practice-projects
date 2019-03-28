const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in models
let User = require('../models/user')

//Register form
router.get('/register', (req, res) => {
	res.render('register');
})

//Register process
router.post('/register', [
	check('name', 'A name is required').not().isEmpty(),
	check('email', 'An email is required').not().isEmpty(),
	check('email', 'Invalid email').isEmail(),
	check('username', 'A username is required').not().isEmpty(),
	check('password', 'A password is required').not().isEmpty()
		.custom( (value, {req}) => {
            if (value !== req.body.password2) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }
    )], (req, res, next) => {

		let errors = validationResult(req);
		if(!errors.isEmpty()) {
			return (res.render('register', {
    		errors: errors.mapped()
    		}))
		} else {
			let newUser = new User();
			newUser.name = req.body.name;
			newUser.email = req.body.email;
			newUser.username = req.body.username;

			var salt = bcrypt.genSaltSync(10);
			var hash = bcrypt.hashSync(req.body.password, salt);
			newUser.password = hash;

			newUser.save( (err) => {
				if(err) {
					console.log(err);
					return;
				} else {
					req.flash('success', 'You are now registered and can log in!')
					res.redirect('/users/login')
				}
			})
		}	
	})

//Login form
router.get('/login', (req, res) => {
	res.render('login');
});

//Login process
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { 
  	successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true 
	})(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/users/login')
})

module.exports = router;
