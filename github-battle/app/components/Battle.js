var React = require('React');
var PropTypes = require('prop-types');

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
			<form className='player-input' onSubmit={this.handleSubmit}>
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
	}

	handleSubmit (user, username) {
		this.setState (function () {
			let newState = {};
			newState[user + 'Name'] = username;
			newState[user + 'Image'] = 'https://github.com' + username + '.png?size=200';
			return newState;
		})
	}

	render () {
		return (
			<div className='battle-section'>
				{!this.state.playerOneName &&
					<UserInput 
					user='playerOne' 
					label='Player One'
					onSubmit={this.handleSubmit}
				/>}

				{!this.state.playerTwoName &&
					<UserInput
					user='playerTwo'
					label='Player Two'
					onSubmit={this.handleSubmit} 
				/>} 
			</div>
		)
	}
}

module.exports = Battle;