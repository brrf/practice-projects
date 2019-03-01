export default function polls (state = {}, action) {
	switch (action.type) {
		case 'RECEIVE_POLLS':
			return {
				...state,
				...action.polls
			}
		case 'CREATE_POLL':
			return {
				...state,
				[action.poll.id]: action.poll
			}
		case 'ANSWER_POLL':
			const {id, authedUser, answer} = action
			const poll = state[id]
			const votesKey = answer + 'Votes'

			return  {
				...state,
					[action.id]: {
						...poll,
						[votesKey]: poll[votesKey].concat([authedUser])			
					}
			}		
		default: return state
	}
}