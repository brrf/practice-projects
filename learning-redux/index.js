
alert('it is working');

function todos (state = [], action) {

	switch (action.type) {
		case 'ADD_TODO' :
			return state.concat([action.todo]);
		case 'REMOVE_TODO' :
			return state.filter( todo => todo.index !== action.index );	
		case 'TOGGLE_TODO' :
			return state.map( todo => todo.index !== action.index ? todo : {
				index: todo.index,
				name: todo.name,
				completed: !todo.completed
			})
		default: return state
	}
}

function goals (state = [], action) {

	switch (action.type) {
		case 'ADD_GOAL' :
			return state.concat([action.goal]);
		case 'REMOVE_GOAL' :
			return state.filter( goal => goal.index !== action.index)
	}
}

function app (state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action)
	}
}

function createStore (reducer) {

	let state;
	let listeners = [];

	const getState = () => state;

	const subscribe = (listener) => {
		listeners.push(listener);
		return ( () => {
			listeners = listeners.filter(l => l !== listener)
		});
	}

	const dispatch = (action) => {
	    state = reducer(state, action)
	    for (let i = 0; i < listeners.length; i++) {
	    	listeners[i]();
	    }
  	}

	return {
		getState,
		subscribe,
		dispatch
	}
}

const store = createStore(app);
const unsubscribe = store.subscribe ( () => console.log('the state is:', store.getState()));

store.dispatch ({
	type: 'ADD_TODO',
	todo: {
		index: 0,
		name: 'Learn Redux',
		completed: false
	}
});

store.dispatch ({
	type: 'ADD_GOAL',
	goal: {
		index: 0,
		name: 'Lose 100lbs',
		completed: false
	}
});

