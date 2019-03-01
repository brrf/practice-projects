import React from 'react'
import {connect} from 'react-redux'


function Leaderboard ({users}) {	
	return (
		<ul>
			{users.map( user => (
				<li className='user'
					key={user.id}>
					<img className='avatar' src={user.avatarURL} alt='avatar'/>
					<div>
						<h1>{user.name}</h1>
						<p>{user.polls} polls </p>
						<p>{user.answers} answers </p>
					</div>
				</li>
			))}
		</ul>
	)
}



function mapStateToProps ({users}) {

	return {
		users: Object.keys(users)
			.map( (id) => {
				const {name, avatarURL, polls, answers} = users[id]
				return {
					name,
					avatarURL,
					polls: polls.length,
					answers: answers.length,
					id
				}
			})
			.sort( (a,b,) => (b.polls + b.answers) - (a.polls + a.answers))
	}
}


export default connect(mapStateToProps)(Leaderboard)