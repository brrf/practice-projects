import API from 'goals-todos-api'

export function handleInitialData () {
			return (dispatch) => {
				Promise.all([
				  API.fetchTodos(),
				  API.fetchGoals()
				]).then( ([todos, goals]) => {
					dispatch(receiveDataAction(todos, goals))
				})
			}
		}

function receiveDataAction (todos, goals) {
	return {
		type: 'RECEIVE_DATA',
		todos,
		goals

	}
}