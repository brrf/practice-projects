import React from 'react';

export default function Length ({activity, length, increment, decrement}) {
	return (
		<div>
			<p>{activity} Length</p>
			<div>
				<button onClick={decrement}><i className="fas fa-arrow-down"></i></button>
					<div>{length/60000}</div>
				<button onClick={increment}><i className="fas fa-arrow-up"></i></button>
			</div>
		</div>
	)
}