var React = require('React');
var Link = require('React-router-dom').Link;

class Home extends React.Component {
	render () {
		return(
			<div className='home-container'>
				<h1>Github Battle: Battle Your Friends!</h1>

				<Link className='button' to='/battle'>
					Battle
				</Link>
			</div>
		)
	}

}

module.exports = Home;