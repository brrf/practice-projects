var React = require('react');
var ReactRouter = require('react-router-DOM');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

var Popular = require('./Popular');
var Home = require('./Home')
var Nav = require('./Nav')


class App extends React.Component {
	render () {
		return (
			<Router>
				<div className='container'>
					<Nav />
					<Route exact path='/' component={Home} />
					<Route path='/Popular' component={Popular} />
				</div>
			</Router>
		)
  	}
}

module.exports = App;