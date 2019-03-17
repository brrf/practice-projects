import React from 'react';

export default class Counter extends React.Component {

	formatTimer = () => {
		let timer = new Date(this.props.remaining)
		let mm = timer.getMinutes();
		let ss = timer.getSeconds();

		if (mm < 10) {mm = '0' + mm};
		if (ss < 10) {ss = '0' + ss};

		return (`${mm}:${ss}`);
	}

	render () {
		return (
		<div>
			<div>{this.props.activity}</div>
			<div>{this.formatTimer()}</div>
		</div>
		)
	}
}