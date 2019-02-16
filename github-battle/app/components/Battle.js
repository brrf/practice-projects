var React = require('React');
var PropTypes = require('prop-types');

function PlayerPreview (props) {

	return (
		<div className='column'>
			<img className='avatar'
				src={props.image}
			/>
			<h2>@{props.username} </h2>
			<button onClick={props.onReset.bind(null, props.user)}
					className='reset'>
				Reset
			</button>
		</div>
	)
}

PlayerPreview.propTypes = {
	image: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onReset: PropTypes.func.isRequired,
	user: PropTypes.string.isRequired
}

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
		return (
			<div className='row'>
				{!this.state.playerOneName &&
					<UserInput 
					user='playerOne' 
					label='Player One'
					onSubmit={this.handleSubmit}
				/>}

				{this.state.playerOneImage !== null &&
					<PlayerPreview image={this.state.playerOneImage}
								   username={this.state.playerOneName}
								   onReset={this.handleReset}
								   user='playerOne'
				/>}

				{!this.state.playerTwoName &&
					<UserInput
					user='playerTwo'
					label='Player Two'
					onSubmit={this.handleSubmit} 
				/>} 

				{this.state.playerTwoImage !== null &&
					<PlayerPreview image={this.state.playerTwoImage}
								   username={this.state.playerTwoName}
								   onReset={this.handleReset}
								   user='playerTwo'
				/>}
			</div>
		)
	}
}

module.exports = Battle;