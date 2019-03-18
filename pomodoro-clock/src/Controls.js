import React from 'react';


export default function Controls ({toggle, toggleActive, reset}) {
	return (
		<div>
			<button id='start_stop' 
					onClick={toggleActive} 
					className='toggle-active activity-control'>
						<i className="fa fa-play fa-2x"></i>
						<i className="fa fa-pause fa-2x"></i>
			</button>
			<button id='reset' onClick={reset} className='activity-control'><i className="fas fa-sync fa-2x"></i></button>

		</div>
	)
}