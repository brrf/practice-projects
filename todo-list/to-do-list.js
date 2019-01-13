var todoList = {

	todos: [],

	addTodo: function (todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
		interface.displayTodos();
	},
	changeTodo: function (position, todoText) {
		this.todos[position].todoText = todoText;
		interface.displayTodos();
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
		interface.displayTodos();
	},

	toggleCompleted: function(position) {
		this.todos[position].completed = !this.todos[position].completed;
		interface.displayTodos();
		
	},
	toggleAll: function() {
		let items = this.todos;
		let allChecked = true;

		items.forEach (function(item) {
			if (!item.completed) {
				allChecked = false;
			}
		});
		items.forEach(function(item) {
			if (!allChecked) {
				item.completed = true;
			}
			else {
				item.completed = false;
			}
		})
		interface.displayTodos();
	},
}

var handlers = {
	displayTodos: function() {
		interface.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
	},
	addTodo: function() {
		var todoText = document.querySelector('.addTodoText').value;
		todoList.addTodo(todoText);
	},
	deleteTodo: function(position) {	
		todoList.deleteTodo(position);
		position = '';
	},
	changeTodo: function() {
		var changeTodoPosition = document.querySelector('.changeTodoPosition').value;
		var changeTodoText = document.querySelector('.changeTodoText').value;
		todoList.changeTodo(changeTodoPosition - 1, changeTodoText);
		changeTodoPosition = '';
		changeTodoText = '';
	},
	toggleCompleted: function() {
		var toggleCompletedPosition = document.querySelector('.toggleCompletedPosition').value;
		todoList.toggleCompleted(toggleCompletedPosition - 1);
	}
}

var interface = {
	displayTodos: function () {	
		let entireList = document.querySelector('.entire-list');
		entireList.innerHTML = '';
		
		
		if (todoList.todos.length === 0) {
			entireList.innerHTML = 'Your To-do list is empty!';
		}	
		todoList.todos.forEach(function(todo, position) {
			var newLi  = document.createElement('li'); 
			newLi.id = position;
			entireList.appendChild(newLi);

			if (todo.completed) {
				newLi.textContent = `(x) ${todo.todoText}`
			} else {
				newLi.textContent = `( ) ${todo.todoText}`
			}

			entireList.childNodes[position].appendChild( this.createDeleteButton() );	
		}, this)	
	},

	setUpEventListeners: function () {
		var entireList = document.querySelector('.entire-list')
		entireList.addEventListener('click', function(event) {

		if (event.target.nodeName !== 'BUTTON') {
			return;
		}
		handlers.deleteTodo(event.target.parentNode.id);
		});
	},

	createDeleteButton: function () {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'delete';
		deleteButton.className = 'deleteButton'
		return deleteButton;

	},


	populate: function populate(n) {
		for (let i = 0; i <= n; i++) {
			todoList.addTodo(`item: ${i+1}`);
		}
	}
}

interface.populate(4)
interface.setUpEventListeners();



