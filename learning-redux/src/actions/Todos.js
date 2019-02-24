import API from 'goals-todos-api'

export function handleAddTodo (value, func) {
			return (dispatch) => {
				return API.saveTodo(value)
					.then( (todo) => {
						dispatch(addTodo(todo))
						func()
					})
					.catch( () => alert('Oops. An error has occurred!'));
			}
		}

function addTodo (todo) {
	return {
		type: 'ADD_TODO',
		todo
	}
}

export function handleDeleteTodo (todo) {
	return (dispatch) => {
		dispatch(removeTodo(todo.id));

		API.deleteTodo(todo.id)
		  .catch( () => {
			dispatch(addTodo(todo));
			alert('Oops. An error has occurred!');
			})
	}
}

function removeTodo (id) {
	return {
		type: 'REMOVE_TODO',
		id
	}
}

export function handleToggleTodo (todo) {
	return (dispatch) => {
		dispatch(toggleTodo(todo.id));

		API.saveTodoToggle (todo.id)
			.catch( () => {
				dispatch(toggleTodo(todo.id));
				alert('Oops. An error has occurred!');
			})
	}
}

function toggleTodo (id) {
	return {
		type: 'TOGGLE_TODO',
		id
	}
}