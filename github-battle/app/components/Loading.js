import React from 'react';
import PropTypes from 'prop-types';


const style = {
	textAlign: 'center',
	fontSize: '35px'
};

class Loading extends React.Component {
	state = {
			text: this.props.text
		}

	static propTypes = {
	text: PropTypes.string.isRequired,
	speed: PropTypes.number.isRequired
	}

	static defaultProps = {
	text: 'Loading',
	speed: 200
	}

	componentDidMount () {

		const {text, speed} = this.props
		const stopper = text + '...';

		this.flashing = setInterval( () => {		
			this.state.text === stopper 
				? this.setState( () => ({text: text}))
				: this.setState( prevState => ({text: prevState.text + '.'}))
		}, speed)
	}

	componentWillUnmount () {
		clearInterval(this.flashing);
	}

	render () {
		return (
			<div style={style}>
				{this.state.text}
			</div>
			)
	}
}

export default Loading;