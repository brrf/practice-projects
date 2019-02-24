import React from 'react';


export default class Loading extends React.Component {
	constructor (props) {
		super (props);

		this.state = {text: 'Loading'}
	}

	componentDidMount () {
		const stopper = 'Loading...'

		this.counter = setInterval( () => {
			this.state.text !== stopper 
				? this.setState({
				text: this.state.text + '.'
				}) 
				: this.setState({
				text: 'Loading'
				})
		}, 200)
	}

	componentWillUnmount () {
		clearInterval(this.counter)
	}

	render () {			
		return (
		<h3>{this.state.text}</h3>
		)
	}
}