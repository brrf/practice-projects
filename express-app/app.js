const express = require('express');
const path = require('path')

//Init app
let app = express();

//Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Home Route
app.get('/', (req, res) => {
	res.render('index', {
		name: 'Moshe'
	})
});

//Add Route

app.get('/articles/add', (req, res) => {
	res.render('add_article', {
		title: 'Add article'
	})
})

//Start server
app.listen(3009, () => {
	console.log('Server running on port: 3009')
})