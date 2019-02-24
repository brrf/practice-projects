const checker = (store) => (next) => (action) => {
	if (action.type === "ADD_TODO" &&
		action.todo.name.toLowerCase().indexOf('tron') !== -1
	) {
		alert('That is a terrible idea');
	}
	if (action.type === "ADD_GOAL" &&
		action.goal.name.toLowerCase().indexOf('tron') !== -1
	) {
		alert('That is a terrible idea');
	}
	return next(action)
}

export default checker