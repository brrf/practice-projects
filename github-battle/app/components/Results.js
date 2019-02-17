import React from 'react';
import queryString from 'query-string';
import {battle} from '../utils/Api';
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview';
import PropTypes from 'prop-types';
import Loading from './Loading';

function Contestant({result, label}) {

	const profile = result.profile;

	return (
		<div className='column'>
			<h1 className='header'>{label}</h1>
			<h3 style={{textAlign: 'center'}}>Score: {result.score}</h3>
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
		const { playerOneName, playerTwoName} = queryString.parse(this.props.location.search);
		
		battle([
			playerOneName, 
			playerTwoName
		])
		.then( results => {
			if (results === null) {
				return this.setState( () => ({
					error: 'An error has occured! Please check: github user may not exist.',
					loading: false
				}))
			}

			this.setState( () => ({
				winner: results[0],
				loser: results[1],
				loading: false,
			}))
		});
	}

	render () {
		const {winner, loser, error, loading} = this.state;

		if (loading === true) {
			return <Loading />
		}

		if (error) {
			return (
				<div>
					<p>{error}</p>
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

export default Results;