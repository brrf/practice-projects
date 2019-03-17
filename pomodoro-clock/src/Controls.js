import React from 'react';


export default function Controls ({toggle, activate, disactivate, reset}) {
	return (
		<div>
			<button onClick={activate} className='toggle-active'><i className="far fa-play-circle"></i></button>
			<button onClick={disactivate} className='toggle-active'><i className="far fa-stop-circle"></i></button>
			<button onClick={reset}><i className="fas fa-sync-alt"></i></button>
		</div>
	)
}