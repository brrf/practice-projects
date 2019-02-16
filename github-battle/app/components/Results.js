var React = require('React');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview')
var PropTypes = require('prop-types');

function Contestant(props) {

	let profile = props.result.profile;

	return (
		<div className='column'>
			<h1 className='header'>{props.label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {props.result.score}</h3>
			<PlayerPreview
				image={profile.avatar_url}
				username={profile.login}>
				<ul className='space-list-items'>
					{profile.name && <li>{profile.name}</li>}
					{profile.location && <li>{profile.location}</li>}
					{profile.company && <li>{profile.company}</li>}
					<li>Followers: {profile.followers}</li>
					<li>Following: {profile.following}</li>
					<li>Public Repos: {profile.public_repos}</li>
					{profile.blog && <li><a href={profile.blog} style={{margin: 0}}>{profile.blog}</a></li>}
				</ul>
			</PlayerPreview>
		</div>
	)
}

Contestant.propTypes = {
	result: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired
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