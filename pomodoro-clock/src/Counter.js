import React from 'react';

export default class Counter extends React.Component {

	getRemaining = () => {
		let mm = 0;
		let ss = 0;
		let remaining = this.props.remaining

		while (remaining >= 60000) {
			mm++;
			remaining -= 60000
		}	
		if (remaining > 59000) {
			mm ++
		} else {
			ss = Math.ceil(remaining / 1000)
		}
		return this.formatTimer(mm, ss);
	}

	formatTimer = (mm, ss) => {
		if (mm < 10) {mm = '0' + mm};
		if (ss < 10) {ss = '0' + ss};
		return(`${mm}:${ss}`)
	}

	render () {
		return (
		<div className='counter'>
			<h2 id='timer-label'>{this.props.activity}</h2>
			<div id='time-left' 
				 className={this.props.remaining < 60000 ? 'counter-display red' : 'counter-display'}>
				 	{this.getRemaining()}
			</div>
		</div>
		)
	}
}