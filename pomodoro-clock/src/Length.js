import React from 'react';

export default function Length ({activity, length, increment, decrement, active, id}) {
	return (
		<div>
			<p className='activity-label' id={`${id}-label`}>{activity} Length</p>
			<div className='length-control'>
				<button onClick={active ? null : decrement}
						className='length-control-child'
						id={`${id}-decrement`}>
							<i className="fa fa-arrow-down fa-2x"></i>
				</button>
				<div className='length-control-child length' 
					 id={`${id}-length`}>
					 	{length}
				</div>
				<button onClick={active ? null : increment} 
						className='length-control-child'
						id={`${id}-increment`}>
							<i className="fa fa-arrow-up fa-2x"></i>
				</button>
			</div>
		</div>
	)
}