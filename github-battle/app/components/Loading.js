var React = require('react');
var PropTypes = require('prop-types');


const style = {
	textAlign: 'center',
	fontSize: '35px'
};

class Loading extends React.Component {
	constructor (props) {
		super(props);


		this.state = {
			text: this.props.text
		}
	}

	componentDidMount () {

		var stopper = this.props.text + '...';

		this.flashing = setInterval( function() {		
			if (this.state.text === stopper) {
				this.setState({
					text: this.props.text
				}) 
			} else {
				this.setState( function(prevState) {
					return {
						text: prevState.text + '.'
					}
				})
			}
		}.bind(this), 200)
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

Loading.propTypes = {
	text: PropTypes.string.isRequired
}

Loading.defaultProps = {
	text: 'Loading'
}

module.exports = Loading;