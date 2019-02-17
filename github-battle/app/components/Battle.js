import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import PlayerPreview from './PlayerPreview'

class UserInput extends React.Component {	
	static propTypes = {
		user: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	state = {
		username: ''
	}

	setUsername = (event) => {
		this.setState ({
			username: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.props.user, this.state.username);
	}

	render () {

		const {label} = this.props;
		const {username} = this.state;

		return ( 
			<form className='column' onSubmit={this.handleSubmit}>
				<h2>{label}</h2>
				<input onChange={this.setUsername} 
					   className='player-name' 
					   type="text" 
					   placeholder="github username" />
				<button type='submit' 
						className='button'
						disabled={!username}>
					Submit
				</button>
			</form>
		)
	}
}

UserInput.propTypes = {
	
}

class Battle extends React.Component {
	state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}
		
	handleSubmit = (user, username) => {
		this.setState ( () => ({
			[user + 'Name'] : username,
			[user + 'Image'] : `https://github.com/${username}.png?size=200`
		}));
	}

	handleReset = (user) => {
		this.setState ( () => ({
			[user + 'Name'] : '',
			[user + 'Image'] : null
		}));
	}

	render () {

		const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = this.state;
		const {match} = this.props;

		return (
			<div>
				<div className='row'>
					{!playerOneName &&
						<UserInput 
						user='playerOne' 
						label='Player One'
						onSubmit={this.handleSubmit}
					/>}

					{playerOneImage !== null &&
						<PlayerPreview image={playerOneImage}
									   username={playerOneName}>
							<button onClick={() => this.handleReset('playerOne')}
									className='reset'>
										Reset
							</button>
						</PlayerPreview>
					}

					{!playerTwoName &&
						<UserInput
						user='playerTwo'
						label='Player Two'
						onSubmit={this.handleSubmit} 
					/>} 

					{playerTwoImage !== null &&
						<PlayerPreview image={playerTwoImage}
									   username={playerTwoName}>
							<button onClick={() => this.handleReset('playerTwo')}
									className='reset'>
										Reset
							</button>
						</PlayerPreview>
					}
				</div>

				{playerOneImage && playerTwoImage &&
					<Link
						className='button'
						to={{
							pathname: match.url + '/results',
							search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
						}}>
						Fight!
					</Link>}
			</div>
		)
	}
}

export default Battle;