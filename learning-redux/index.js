
//generate unique ID for actions
function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

//store/container
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

//reducer components and combined reducer function
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

//initiate store
const store = createStore(app);
const unsubscribe = store.subscribe ( () => console.log('the state is:', store.getState()));

//Update DOM with state

function addToDo () {
	const input = document.getElementById('todo');
	const todo = input.value;
	input.value = '';

	store.dispatch({
		type: 'ADD_TODO',
		todo: {
			index: generateId(),
			name: todo,
			completed: false
	}})
}

function addGoal () {
	const input = document.getElementById('goal');
	const goal = input.value;
	input.value = '';

	store.dispatch({
		type: 'ADD_GOAL',
		goal: {
			index: generateId(),
			name: goal,
			completed: false
	}})
}

document.getElementById('todoBtn').
	addEventListener('click', addToDo)

document.getElementById('goalBtn').
	addEventListener('click', addGoal)




