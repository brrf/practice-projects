
//generate unique ID for actions
function generateId () {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

//store container
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
	    	listeners.forEach((listener => listener()))
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
			return state.map( todo => todo.index !== action.index ? todo : 
				Object.assign({}, todo, {completed: !todo.completed})
			)
		default: return state
	}
}

function goals (state = [], action) {
	switch (action.type) {
		case 'ADD_GOAL' :
			return state.concat([action.goal]);
		case 'REMOVE_GOAL' :
			return state.filter( goal => goal.index !== action.index);
		default: return state
	}
}

function app (state = {}, action) {
	return {
		todos: todos(state.todos, action),
		goals: goals(state.goals, action)
	}
}

//Action functions

function addTodoAction (todo) {
	return {
		type: 'ADD_TODO',
		todo
	}
}

function removeTodoAction (index) {
	return {
		type: 'REMOVE_TODO',
		index
	}
}

function toggleTodoAction (index) {
	return {
		type: 'TOGGLE_TODO',
		index
	}
}

function addGoalAction (goal) {
	return {
		type: 'ADD_GOAL',
		goal
	}
}

function removeGoalAction (index) {
	return {
		type: 'REMOVE_GOAL',
		index
	}
}

//initiate store
const store = createStore(app);

//Update DOM with state

function createRemoveButton (removeItemFunc) {
	const removeBtn = document.createElement('button');
	removeBtn.innerHTML = 'X';
	removeBtn.addEventListener('click', removeItemFunc);

	return removeBtn;
}

const unsubscribe = store.subscribe ( () => {
	const {todos, goals} = store.getState();

	document.getElementById('todos').innerHTML = '';
	document.getElementById('goals').innerHTML = ''
	
	todos.forEach(addTodoToDOM)
	goals.forEach(addGoalToDOM)
});

function addTodoToDOM(todo) {
	const newLi = document.createElement('LI');
	const LiText = todo.name;	
	newLi.innerHTML = LiText;


	const removeButton = createRemoveButton ( () => {
		store.dispatch(removeTodoAction(todo.index))
	})

	newLi.appendChild(removeButton);

	newLi.style.textDecoration = todo.completed ? 'line-through' : 'none'
	newLi.addEventListener('click', () => {
		store.dispatch(toggleTodoAction(todo.index))
		});

	document.getElementById('todos')
		.appendChild(newLi);
}

function addGoalToDOM(goal) {
	const newLi = document.createElement('LI');
	const LiText = goal.name;	
	newLi.innerHTML = LiText;

	const removeButton = createRemoveButton ( () => {
		store.dispatch(removeGoalAction(goal.index))
	})

	newLi.appendChild(removeButton);

	const goals = document.getElementById('goals')
		.appendChild(newLi);
}

function addToDo () {
	const input = document.getElementById('todo');
	const todo = input.value;
	
	input.value = '';

	store.dispatch(addTodoAction({
		index: generateId(),
		name: todo,
		completed: false
	}));
}

function addGoal () {
	const input = document.getElementById('goal');
	const goal = input.value;
	input.value = '';

	store.dispatch(addGoalAction({
		index: generateId(),
		name: goal,
		completed: false
	}));
}

document.getElementById('todoBtn').
	addEventListener('click', addToDo)

document.getElementById('goalBtn').
	addEventListener('click', addGoal)
