import React from 'react';
import PropTypes from 'prop-types';

export default function PlayerPreview ({image, username, children}) {

	return (
		<div className='column'>
			<img className='avatar'
				src={image}
			/>
			<h2>@{username} </h2>
			{children}
		</div>
	)
}

PlayerPreview.propTypes = {
	image: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
}
