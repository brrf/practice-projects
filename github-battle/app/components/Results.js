var React = require('React');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;

class Results extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			winner: null,
			loser: null,
			error: null,
			loading: true
		}
	}

	componentDidMount () {
		var players = queryString.parse(this.props.location.search);
		api.battle([
			players.playerOneName, 
			players.playerTwoName])
		.then(function(results) {
			if (results === null) {
				this.setState({
					error: 'an error has occured!',
					loading: false
				})
			}	

			this.setState({
				winner: results[0],
				loser: results[1],
				loading: false,
			})
		}.bind(this));
	}

	render () {

		let winner = this.state.winner;
		let loser = this.state.loser;
		console.log(winner)

		if (this.state.loading === true) {
			return <p>Loading...</p>
		}

		if (this.state.error) {
			return (
				<div>
					<p>{this.state.error}</p>
					<Link to='/battle'>Reset</Link>
				</div>
			)
		}

		return (
			<div className='row'>
				
			</div>
		)
	}
}

module.exports = Results;