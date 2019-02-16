var React = require('React');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview')

function Contestant(props) {

	let profile = props.result.profile;

	return (
		<div className='column'>
			<h3 className='header'>{props.label}</h3>
			<h4>Score: {props.result.score}</h4>
			<PlayerPreview
				image={`https://github.com/${profile.login}.png?size=200`}
				username={profile.name}>
				<div>
					<p>{profile.name}</p>
					<p>{profile.location}</p>
					<p>{profile.bio}</p>
					<p>Followers: {profile.followers}</p>
					<p>Following: {profile.following}</p>
					<p>Public Repos: {profile.public_repos}</p>
					<p><a href={profile.blog}>{profile.blog}</a></p>
				</div>
			</PlayerPreview>
		</div>
	)
}

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
				<Contestant result={winner}
							label='winner' />
				<Contestant result={loser}
							label='loser' />
			</div>
		)
	}
}

module.exports = Results;