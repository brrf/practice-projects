var React = require('react');
var Popular = require('./Popular')
var Nav = require('./Nav')


class App extends React.Component {
	render () {
		return (
			<div>
			 <Nav />
		 	 <Popular />
		 	</div>
		)
  	}
}

module.exports = App;