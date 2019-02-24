import API from 'goals-todos-api'


export function handleAddGoal (value, func) {
			return (dispatch) => {
				return API.saveGoal(value)
				.then( (goal) => {
					dispatch(addGoal(goal))
					func()
				})
				.catch( () => alert('Oops. An error has occurred!'));
			}
		}

function addGoal (goal) {
	return {
		type: 'ADD_GOAL',
		goal
	}
}

export function handleDeleteGoal (goal) {
	return (dispatch) => {
		dispatch(removeGoal(goal.id))

		API.deleteGoal(goal.id)
			.catch( () => {
				dispatch(addGoal(goal));
				alert('Oops. An error has occurred!');
			})
	}
}

function removeGoal (id) {
	return {
		type: 'REMOVE_GOAL',
		id
	}
}