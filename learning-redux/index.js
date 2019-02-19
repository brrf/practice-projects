
{
	type: 'ADD_TODO',
	todo: {
		index: 0,
		name: 'Learn Redux',
		completed: false
	}
}

function todos (state = [], action) {
	if (action.type === 'ADD_TODO') {
		return state.concat([action.todo])
	};
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
		dispatch,
		listeners
	}
}

const store = createStore(todos);
const unsubscribe = store.subscribe ( () => console.log(`the state has been updated`));

store.dispatch ({
	type: 'ADD_TODO',
	todo: {
		index: 0,
		name: 'Learn Redux',
		completed: false
	}
});


