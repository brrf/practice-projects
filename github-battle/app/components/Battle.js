var React = require('React');
var PropTypes = require('prop-types');
var Link = require('React-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class UserInput extends React.Component {
	constructor (props) {
		super (props);
	
		this.state = {
			username: '',
		}
		this.setUsername = this.setUsername.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	setUsername (event) {
		this.setState ({
			username: event.target.value
		})
	}

	handleSubmit (event) {
		event.preventDefault();
		this.props.onSubmit(this.props.user, this.state.username);
	}

	render () {
		return ( 
			<form className='column' onSubmit={this.handleSubmit}>
				<h2>{this.props.label}</h2>
				<input onChange={this.setUsername} 
					   className='player-name' 
					   type="text" 
					   placeholder="github username" />
				<button type='submit' 
						className='button'
						disabled={!this.state.username}>
					Submit
				</button>
			</form>
		)
	}
}

UserInput.propTypes = {
	user: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
	constructor (props) {
		super (props);
	
		this.state = {
			playerOneName: '',
			playerTwoName: '',
			playerOneImage: null,
			playerTwoImage: null
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	handleSubmit (user, username) {
		this.setState (function () {
			let newState = {};
			newState[user + 'Name'] = username;
			newState[user + 'Image'] = 'https://github.com/' + username + '.png?size=200';
			return newState;
		})
	}

	handleReset (user) {
		this.setState (function () {
			let newState = {};
			newState[user + 'Name'] = '';
			newState[user + 'Image'] = null;
			return newState;
		})
	}

	render () {

		const playerOneName = this.state.playerOneName;
		const playerTwoName = this.state.playerTwoName;
		const playerOneImage = this.state.playerOneImage;
		const playerTwoImage = this.state.playerTwoImage;
		const match = this.props.match;

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
							<button onClick={this.handleReset.bind(null, 'playerOne')}
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
							<button onClick={this.handleReset.bind(null, 'playerTwo')}
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
							search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
						}}>
						Fight!
					</Link>}
			</div>
		)
	}
}

module.exports = Battle;